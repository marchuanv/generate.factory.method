const utils = require('utils');
describe("when starting an http message bus and sending and http request given a hostname and port number", function() {

    let token = null;

    beforeAll(() => {
        const userId = 'httpconnectiontest';
        const secret = 'httpconnectiontest1234';
        const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
        const { sharedUserSessions } = createSharedUserSessions({});
        const { userSecurity } = sharedUserSessions.ensureSession({ userId });
        userSecurity.register({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
    });

    it("it should return the http messagebus host address", (done) => {
        // Arrange
        const  contextId = "HttpMessageBusTest1";
        const { createHttpMessageBus } = require('../../lib/factory/httpmessagebus.factory.js');
        const { createEventPublisher } = require('../../lib/factory/eventpublisher.factory.js');
        const { createEventSubscription } = require('../../lib/factory/eventsubscription.factory.js');
        const { httpMessageBus } = createHttpMessageBus({ timeout: 15000, contextId, senderHost: 'localhost', senderPort: 3000 });
        const { eventPublisher } = createEventPublisher({ contextId, eventCode: 1, eventSource: 'HttpMessageBusTest1', eventDescription: 'Start Http Message Bus' });
        eventPublisher.publish();
        const { eventSubscription } = createEventSubscription({ contextId, eventCode: 3, subscriptionName: 'HttpMessageBusTest1' }); // message bus started event
        eventSubscription.subscribe({ callback: async () => {

            // Act
            const { host, port } = httpMessageBus.getServerAddress();

            // Assert
            {   
                // Stop The Message Bus
                const { eventPublisher } = createEventPublisher({ contextId, eventCode: 8, eventSource: 'HttpMessageBusTest', eventDescription: 'Stop Http Message Bus' });
                await eventPublisher.publish();
            }
            expect(`${host}:${port}`).toEqual('localhost:3000');
            expect(httpMessageBus.isOpen()).toBeFalsy();
            setTimeout(done, 5000);
        }});
    });

    it("it should respond to a queued request message", (done) => {
        // Arrange
        const  contextId = "HttpMessageBusTest2";
        const { createMessage } = require('../../lib/factory/message.factory.js');
        const { createHttpMessageBus } = require('../../lib/factory/httpmessagebus.factory.js');
        const { createEventPublisher } = require('../../lib/factory/eventpublisher.factory.js');
        const { createEventSubscription } = require('../../lib/factory/eventsubscription.factory.js');
        const { httpMessageBus, httpClientMessageQueue, httpServerMessageQueue } = createHttpMessageBus({ timeout: 15000, contextId, senderHost: 'localhost', senderPort: 3000 });
        
        { 
            //START
            const { eventPublisher } = createEventPublisher({ contextId, eventCode: 1, eventSource: 'HttpMessageBusTest2', eventDescription: 'Start Http Message Bus' });
            eventPublisher.publish();
        }
      
        
        const { eventSubscription } = createEventSubscription({ contextId, eventCode: 3, subscriptionName: 'HttpMessageBusTest2' });
        eventSubscription.subscribe({ callback: async () => {
            
            let _httpRequestMessage = null;

            {
                //Http Request
                const { eventPublisher } = createEventPublisher({ contextId, eventCode: 4, eventSource: 'HttpMessageBusTest2', eventDescription: 'Send Http Request' });
                await eventPublisher.publish();
            }

            await httpClientMessageQueue.enqueueHttpRequestMessage(createMessage({ 
                recipientHost: 'localhost',
                recipientPort: 3000,
                Id: null,
                data: 'Hello From Client',
                metadata: { path: '/connectiontest' },
                token,
                messageStatusCode: 2, //pending
                senderHost: 'localhost',
                senderPort: 3000
            }));

            httpServerMessageQueue.dequeueHttpRequestMessage().then(async ({ httpRequestMessage }) => {
                _httpRequestMessage = httpRequestMessage;
                await httpServerMessageQueue.enqueueHttpResponseMessage(createMessage({ 
                    recipientHost: 'localhost',
                    recipientPort: 3000,
                    Id: null,
                    data: 'Hello From Server',
                    metadata: {  path: '/connectiontest' },
                    token,
                    messageStatusCode: 0, //success
                    senderHost: 'localhost',
                    senderPort: 3000
                }));
            });

            // Act
            const { httpResponseMessage } = await httpClientMessageQueue.dequeueHttpResponseMessage();

            // Assert
            {   
                // Stop The Message Bus
                const { eventPublisher } = createEventPublisher({ contextId, eventCode: 8, eventSource: 'HttpMessageBusTest', eventDescription: 'Stop Http Message Bus' });
                await eventPublisher.publish();
            }
            expect(httpMessageBus.isOpen()).toBeFalsy();
            expect(_httpRequestMessage).not.toBeNull();
            expect(_httpRequestMessage.getStatusCode).toBeUndefined();
            expect(httpResponseMessage.getStatusCode()).toEqual(200);
            expect(utils.getJSONString(httpResponseMessage.getDecryptedContent())).toEqual(utils.getJSONString({ text: 'Hello From Server' }));
            setTimeout(done, 5000);
        }});
    });
});
