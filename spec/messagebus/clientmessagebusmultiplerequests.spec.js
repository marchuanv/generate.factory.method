const utils = require('utils');
describe("when asking a client messagebus to publish more than one request", function() {

  let token = null;
  const factoryContainerBindingName  = 'messagebusmultiplerequests';
  const timeout = 15000;
  const senderHost = 'localhost';
  const senderPort = 3000;
  const recipientHost = 'localhost';
  const recipientPort = 3000;

  const { createMessage } = require('../../lib/factory/message.factory');
  const { createHttpServerMessageBusManager } = require('../../lib/factory/httpservermessagebusmanager.factory.js');
  const { createHttpClientMessageBusManager } = require('../../lib/factory/httpclientmessagebusmanager.factory.js');
  const { createHttpClientMessageBus } = require('../../lib/factory/httpclientmessagebus.factory.js');
  const { createUserSessions } = require('../../lib/factory/usersessions.factory.js');
  const { createHttpServerMessageBus } = require('../../lib/factory/httpservermessagebus.factory.js');
  const { createServerMessageBus } = require('../../lib/factory/servermessagebus.factory.js');
  const { createClientMessageBus } = require('../../lib/factory/clientmessagebus.factory.js');

  beforeAll(() => {
    const userId = factoryContainerBindingName;
    const secret = `${factoryContainerBindingName}1234`;
    const { userSessions } = createUserSessions({ factoryContainerBindingName });
    const { userSecurity } = userSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    ({ token } = userSecurity.authenticate({ secret }));
    createHttpServerMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });
    createHttpClientMessageBus({ factoryContainerBindingName, timeout });
    createHttpServerMessageBusManager({ factoryContainerBindingName });
    createHttpClientMessageBusManager({ factoryContainerBindingName });
  });

  it("it should respond to every request", (done) => {
    
    // Arrange
    const metadata = { path:  `/${factoryContainerBindingName}` };
    let expectedDecryptedClientText1 = `${factoryContainerBindingName}: Hello From Client First`;
    let expectedDecryptedClientText2 = `${factoryContainerBindingName}: Hello From Client Second`;
    let expectedDecryptedServerText1 = `${factoryContainerBindingName}: Hello From Server First`;
    let expectedDecryptedServerText2 = `${factoryContainerBindingName}: Hello From Server Second`;
    let requestMessage1 = null;
    let requestMessage2 = null;

    const { clientMessageBus } = createClientMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });
    { 
      //Simulate a Server
      const { serverMessageBus } = createServerMessageBus({ factoryContainerBindingName, timeout, senderHost, senderPort });
      serverMessageBus.publish(createMessage({ 
        factoryContainerBindingName: utils.generateGUID(),
        messageStatusCode: 0, Id: null, data: expectedDecryptedServerText1, 
        recipientHost, recipientPort, metadata, token, senderHost, senderPort 
      }));
      serverMessageBus.publish(createMessage({ 
        factoryContainerBindingName: utils.generateGUID(),
        messageStatusCode: 0, Id: null, data: expectedDecryptedServerText2, 
        recipientHost, recipientPort, metadata, token, senderHost, senderPort 
      }));
      serverMessageBus.subscribe({ callback: ({ message }) => {
        if (!requestMessage1) {
          requestMessage1 = message;
        } else {
          requestMessage2 = message;
        }
      }});
    }

    // Act
    clientMessageBus.publish(createMessage({ 
      factoryContainerBindingName: utils.generateGUID(),
      messageStatusCode: 2, Id: null, data: expectedDecryptedClientText1,
      recipientHost, recipientPort, metadata, token, senderHost, senderPort 
    }));
    clientMessageBus.publish(createMessage({ 
      factoryContainerBindingName: utils.generateGUID(),
      messageStatusCode: 2, Id: null, data: expectedDecryptedClientText2,
      recipientHost, recipientPort, metadata, token, senderHost, senderPort 
    }));

    // Assert
    clientMessageBus.subscribe({ callback: ({ message }) => {
      const responseMessage = message;
      expect(responseMessage).not.toBeUndefined();
      expect(responseMessage).not.toBeNull();
      {
        const { text } = responseMessage.getDecryptedContent();
        const { code } = responseMessage.getMessageStatus();
        expect(text).toEqual(expectedDecryptedServerText1);
        expect(code).toEqual(0); //success
      }
      expect(requestMessage1).not.toBeUndefined();
      expect(requestMessage1).not.toBeNull();
      {
        const { code } = requestMessage1.getMessageStatus();
        const { text } = requestMessage1.getDecryptedContent();
        expect(code).toEqual(2); //pending
        expect(text).toEqual(expectedDecryptedClientText1);
      }
      {
        const { senderHost, senderPort } = requestMessage1.getSenderAddress();
        expect(senderHost).toEqual('localhost');
        expect(senderPort).toEqual(3000);
      }
    }});
    clientMessageBus.subscribe({ callback: ({ message }) => {
      const responseMessage = message;
      expect(responseMessage).not.toBeUndefined();
      expect(responseMessage).not.toBeNull();
      {
        const { text } = responseMessage.getDecryptedContent();
        const { code } = responseMessage.getMessageStatus();
        expect(text).toEqual(expectedDecryptedServerText2);
        expect(code).toEqual(0); //success
      }
      expect(requestMessage2).not.toBeUndefined();
      expect(requestMessage2).not.toBeNull();
      {
        const { code } = requestMessage2.getMessageStatus();
        const { text } = requestMessage2.getDecryptedContent();
        expect(code).toEqual(2); //pending
        expect(text).toEqual(expectedDecryptedClientText2);
      }
      {
        const { senderHost, senderPort } = requestMessage2.getSenderAddress();
        expect(senderHost).toEqual('localhost');
        expect(senderPort).toEqual(3000);
      }
      setTimeout(done, 10000);
    }});
  });
});
