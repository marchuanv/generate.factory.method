describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    beforeAll(async () => {
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection, messageQueue, hostAddress } = createHttpConnection({ 
            timeout: 8000,
            userId: 'joe',
            recipientHost: 'localhost',
            recipientPort: 3000,
            host: 'localhost',
            hostPort: 3000
        });
        this.httpConnection = httpConnection;
        this.messageQueue = messageQueue;
        this.hostAddress = hostAddress;
    });
    it("it should return the server host address", async () => {
        // Arrange
        await this.httpConnection.open();
        expect(this.httpConnection.isOpen()).toBeTruthy();

        // Act
        const { host, port } = this.httpConnection.getServerAddress();

        // Assert
        expect(`${host}:${port}`).toEqual('localhost:3000');
        this.httpConnection.close();
        expect(this.httpConnection.isOpen()).toBeFalsy();
    });
    it("it should return the recipient address", async () => {
        // Arrange
        // Act
        const { recipientHost, recipientPort } = this.httpConnection.getRecipientAddress();
        // Assert
        expect(`${recipientHost}:${recipientPort}`).toEqual('localhost:3000');
    });

    it("it should respond to a queued request", async () => {
     
        // Arrange
        const path = '/';
        const method = 'POST';
        const senderHost = 'localhost';
        const senderPort = 2000;
        let _httpRequestMessage = null;

        await this.httpConnection.open();
        expect(this.httpConnection.isOpen()).toBeTruthy();
        await this.messageQueue.enqueueRawHttpRequest({ path, method, senderHost, senderPort, data: 'Hello World' });
        this.messageQueue.dequeueHttpRequestMessage().then(async ({ httpRequestMessage }) => {
            _httpRequestMessage = httpRequestMessage;
            await this.messageQueue.enqueueRawHttpResponse({ senderHost, senderPort, data: 'Hello World from Server', httpStatusCode: 200 });
        });

        // Act
        const { httpResponseMessage } = await messageQueue.dequeueHttpResponseMessage();

        // Assert
        this.httpConnection.close();
        expect(this.httpConnection.isOpen()).toBeFalsy();
        expect(_httpRequestMessage).not.toBeNull();
        expect(_httpRequestMessage.getStatusCode).toBeUndefined();
        expect(httpResponseMessage.getStatusCode()).toEqual(200);
        expect(httpResponseMessage.getContent()).toEqual('Hello World from Server');
    });
});
