const { HttpConnection } = require("../../lib/http/httpconnection");

describe("when opening an http connection given a hostname and port number", function() {
    beforeAll(() => {
        this.connection = new HttpConnection();
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
    it("it should have a closed connection", async () => {
        // Arrange
        expect(this.connection.isOpen()).toBeTruthy();

        // Act
        this.connection.close();

        // Assert
        expect(this.connection.isOpen()).toBeFalsy();
    });
});
