
describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    const recipientAddress = { host: 'localhost', port: 3000 };
    const hostAddress = { host: 'localhost', port: 3000 };
    const userId = 'joe';
    beforeAll(async () => {
        const timeout = 3000;
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection, messageQueue } = createHttpConnection({ hostAddress, userId, timeout });
        this.httpConnection = httpConnection;
        this.messageQueue = messageQueue;
        await this.httpConnection.open();
    });
    it("it should return the server host address", () => {
     
        // Arrange
        expect(this.httpConnection.isOpen()).toBeTruthy();

        // Act
        const address = this.httpConnection.getServerAddress();
   
        // Assert
        expect(address.address).toEqual('127.0.0.1');
    });

    it("it should have a queued request and response", async () => {
     
        // Arrange
        expect(this.httpConnection.isOpen()).toBeTruthy();
        this.messageQueue.dequeueRequestMessage().then(({ httpRequestMessage }) => {
            expect(httpRequestMessage).not.toBeNull();
            const data = 'Hello World from Server';
            this.messageQueue.enqueueRawHttpResponse({ data, headers: {} });
        });

        // Act
        await this.messageQueue.enqueueRawHttpRequest({ 
            path: '/',
            headers: { sender: recipientAddress },
            method: 'POST',
            data: 'Hello World'
        });

        // Assert
        const { httpResponseMessage } = await this.messageQueue.dequeueResponseMessage();
        expect(httpResponseMessage.getContent()).toEqual('Hello World from Server');
    });
    
    xit("it should have a closed connection", () => {
        // Arrange
        expect(this.httpConnection.isOpen()).toBeTruthy();

        // Act
        this.httpConnection.close();

        // Assert
        expect(this.httpConnection.isOpen()).toBeFalsy();
    });
});
