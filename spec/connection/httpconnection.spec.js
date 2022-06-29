const { HttpConnection } = require("../../lib/http/httpconnection");
const { HttpMessageQueue } = require("../../lib/http/httpmessagequeue");
const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");
const { UserIdentity } = require("../../lib/useridentity");
const { Encryption } = require("../../lib/encryption");
const { MessageStore } = require("../../lib/messagestore");

xdescribe("when opening an http connection and sending and http request given a hostname and port number", function() {
    
    const userIdentity = new UserIdentity({ userId: 'admin' });
    userIdentity.authenticate({ secret: 'admin' });
    if (!userIdentity.isRegistered()){
        userIdentity.register({ secret: 'admin' });
    }
    const encryption = new Encryption({ userIdentity });
    const messageStore = new MessageStore();
    const messageFactory = new MessageFactory({ encryption, messageStore });
    const httpMessageFactory = new HttpMessageFactory({ messageFactory });
    const httpMessageQueue = new HttpMessageQueue({ httpMessageFactory });
    const hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
    const recipientAddress = { address: 'localhost', port: 3000 };
    const connection = new HttpConnection({ httpMessageQueue, hostAddress, timeout: 10000 });

    beforeAll(async () => {
        await connection.open();
    });
    
    it("it should return the server host address", () => {
     
        // Arrange
        expect(connection.isOpen()).toBeTruthy();

        // Act
        const address = connection.getServerAddress();
   
        // Assert
        expect(address.address).toEqual('127.0.0.1');
    });

    it("it should have a queued request and response", async () => {
     
        // Arrange
        expect(connection.isOpen()).toBeTruthy();
        httpMessageQueue.dequeueRequestMessage().then(({ httpRequestMessage }) => {
            const data = 'Hello World from Server';
            const headers = {};
            const httpResponseMessage = httpMessageFactory.createHttpResponseMessage({ data, headers });
            httpMessageQueue.enqueueResponseMessage({ httpResponseMessage });
            console.log('test received response');
        });

        // Act
        await httpMessageQueue.enqueueRawRequest({ 
            path: '/',
            headers: { sender: recipientAddress },
            method: 'POST',
            data: 'Hello World'
        });

        // Assert
        const { httpResponseMessage } = await httpMessageQueue.dequeueResponseMessage();
        expect(httpResponseMessage.getContent()).toEqual('Hello World from Server');
    });
    
    it("it should have a closed connection", () => {
        // Arrange
        expect(connection.isOpen()).toBeTruthy();

        // Act
        connection.close();

        // Assert
        expect(connection.isOpen()).toBeFalsy();
    });
});
