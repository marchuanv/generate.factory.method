const { HttpConnection } = require("../../lib/http/httpconnection");
const { HttpRequestQueue } = require("../../lib/http/httprequestqueue");

describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    beforeAll(() => {
        this.httpRequestQueue = new HttpRequestQueue();
        this.connection = new HttpConnection({ httpRequestQueue });
    });
    it("it should have an open connection", async () => {
        // Arrange

        // Act
        await this.connection.open({ host: 'localhost', port: 3000 });

        // Assert
        expect(this.connection.isOpen()).toBeTruthy();
    });
    it("it should return the server host address", async () => {
     
        // Arrange
        expect(this.connection.isOpen()).toBeTruthy();

        // Act
        const address = this.connection.getServerAddress();
   
        // Assert
        expect(address).not.toBeNull();
    });
    it("it should have a queued request and response", async () => {
     
        // Arrange
        expect(this.connection.isOpen()).toBeTruthy();

        // Act
        await this.connection.send({ host: 'localhost', port: 3000, path: '/', headers: {}, method: 'POST', data: 'Hello World' });
   
        // Assert
        const queue = this.httpRequestQueue.getClonedQueue();

    });
    it("it should have a closed connection", async () => {
        // Arrange
        expect(this.connection.isOpen()).toBeTruthy();

        // Act
        this.connection.close();

        // Assert
        expect(this.connection.isOpen()).toBeFalsy();
    });
});
