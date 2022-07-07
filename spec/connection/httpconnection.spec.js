
describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    const recipientAddress = { host: 'localhost', port: 3000 };
    const hostAddress = { host: 'localhost', port: 3000 };
    beforeAll(async () => {
        const timeout = 3000;
        const { createHttpConnection } = require('../../lib/factory/httpconnection.factory.js');
        const { httpConnection, httpMessageQueue } = createHttpConnection({ hostAddress, timeout });
        this.httpConnection = httpConnection;
        this.httpMessageQueue = httpMessageQueue;
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
        this.httpMessageQueue.dequeueRequestMessage().then(({ httpRequestMessage }) => {
            const data = 'Hello World from Server';
            const headers = {};
            const httpResponseMessage = this.factory.httpmessagefactory.createHttpResponseMessage({ data, headers });
            this.httpMessageQueue.enqueueResponseMessage({ httpResponseMessage });
            console.log('test received response');
        });

        // Act
        await this.httpMessageQueue.enqueueRawRequest({ 
            path: '/',
            headers: { sender: recipientAddress },
            method: 'POST',
            data: 'Hello World'
        });

        // Assert
        const { httpResponseMessage } = await this.httpMessageQueue.dequeueResponseMessage();
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
