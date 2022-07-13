describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    beforeAll(async () => {
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection, messageQueue, hostAddress } = createHttpConnection({ 
            timeout: 5000,
            userId: 'joe',
            senderHost: 'localhost',
            senderPort: 2000,
            host: 'localhost',
            hostPort: 3000
        });
        this.httpConnection = httpConnection;
        this.messageQueue = messageQueue;
        this.hostAddress = hostAddress;
        await this.httpConnection.open();
    });
    it("it should return the server host address", () => {
     
        // Arrange
        expect(this.httpConnection.isOpen()).toBeTruthy();

        // Act
        const { host, port } = this.httpConnection.getServerAddress();
   
        // Assert
        expect(`${host}:${port}`).toEqual('localhost:3000');
    });

    it("it should respond to a queued request", async () => {
     
        // Arrange
        expect(this.httpConnection.isOpen()).toBeTruthy();
        this.messageQueue.dequeueHttpRequestMessage().then(({ httpRequestMessage }) => {
            expect(httpRequestMessage).not.toBeNull();
            const data = 'Hello World from Server';
            this.messageQueue.enqueueRawHttpResponse({ data, headers: {}, httpStatusCode: 200 });
        });

        // Act
        await this.messageQueue.enqueueRawHttpRequest({ path: '/', method: 'POST', data: 'Hello World' });

        // Assert
        const { httpResponseMessage } = await this.messageQueue.dequeueHttpResponseMessage();
        expect(httpResponseMessage.getStatusCode()).toEqual(200);
        expect(httpResponseMessage.getContent()).toEqual('Hello World from Server');
    });
    
    it("it should have a closed connection", () => {
        // Arrange
        expect(this.httpConnection.isOpen()).toBeTruthy();

        // Act
        this.httpConnection.close();

        // Assert
        expect(this.httpConnection.isOpen()).toBeFalsy();
    });
});
