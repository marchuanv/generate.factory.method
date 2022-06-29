const { HttpConnection } = require("../../lib/http/httpconnection");
const { HttpMessageQueue } = require("../../lib/http/httpmessagequeue");
const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");
const http = require('http');

describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    beforeAll(async () => {
        const messageFactory = new MessageFactory();
        const httpMessageFactory = new HttpMessageFactory({ messageFactory });
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
        this.httpMessageQueue.dequeueResponse().then(({ httpResponse }) => {
            if (httpResponse instanceof http.ServerResponse) {
                httpResponse.writeHead(200, 'success', {}).end('Hello World from Server');
            }
        });

        // Act
        await this.httpMessageQueue.enqueueRawRequest({ 
            path: '/',
            headers: { sender: this.recipientAddress },
            method: 'POST',
            data: 'Hello World'
        });

        // Assert
        const httpResponse = await this.httpMessageQueue.dequeueResponse();
        expect(httpResponse.body).toEqual('Hello World from Server');
        expect(this.httpMessageQueue.isEmpty()).toBeTruthy();
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
