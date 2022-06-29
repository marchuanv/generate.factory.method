const { HttpConnection } = require("../../lib/http/httpconnection");
const { HttpMessageQueue } = require("../../lib/http/httpmessagequeue");
const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");
const { UserIdentity } = require("../../lib/useridentity");
const { Encryption } = require("../../lib/encryption");
const { MessageStore } = require("../../lib/messagestore");

describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    beforeAll(async () => {
        const userIdentity = new UserIdentity({ userId: 'admin' });
        userIdentity.authenticate({ secret: 'admin' });
        const encryption = new Encryption({ userIdentity });
        const messageStore = new MessageStore();
        const messageFactory = new MessageFactory({ encryption, messageStore });
        const httpMessageFactory = new HttpMessageFactory({ messageFactory });
        this.httpMessageFactory = httpMessageFactory;
        this.httpMessageQueue = new HttpMessageQueue({ httpMessageFactory });
        this.hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
        this.recipientAddress = { address: 'localhost', port: 3000 };
        this.connection = new HttpConnection({ httpMessageQueue: this.httpMessageQueue, hostAddress: this.hostAddress, timeout: 10000 });
        await this.connection.open();
    });
    it("it should return the server host address", () => {
     
        // Arrange
        expect(this.connection.isOpen()).toBeTruthy();

        // Act
        const address = this.connection.getServerAddress();
   
        // Assert
        expect(address.address).toEqual('127.0.0.1');
    });
    it("it should have a queued request and response", async () => {
     
        // Arrange
        expect(this.connection.isOpen()).toBeTruthy();
        this.httpMessageQueue.dequeueRequestMessage().then(({ httpRequestMessage }) => {
            const data = 'Hello World from Server';
            const headers = {};
            const httpResponseMessage = this.httpMessageFactory.createHttpResponseMessage({ data, headers });
            this.httpMessageQueue.enqueueResponseMessage({ httpResponseMessage });
            console.log('test received response');
        });

        // Act
        await this.httpMessageQueue.enqueueRawRequest({ 
            path: '/',
            headers: { sender: this.recipientAddress },
            method: 'POST',
            data: 'Hello World'
        });

        // Assert
        const { httpResponseMessage } = await this.httpMessageQueue.dequeueResponseMessage();
        expect(httpResponseMessage.getContent()).toEqual('Hello World from Server');
    });
    it("it should have a closed connection", () => {
        // Arrange
        expect(this.connection.isOpen()).toBeTruthy();

        // Act
        this.connection.close();

        // Assert
        expect(this.connection.isOpen()).toBeFalsy();
    });
});
