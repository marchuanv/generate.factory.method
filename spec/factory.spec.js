const { HttpConnection } = require('../lib/http/httpconnection');
const { HttpMessageHandler } = require('../lib/http/httpmessagehandler');
const { Factory } = require('../lib/factory');
describe("when asking the factory for an HttpConnection", function() {
    it("it should resolve all dependencies and create an instance", function() {
        // Arrange
        const factory = new Factory();
        const hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
        const timeout = 3000;
        const userId = 'joe';
        factory.httpconnection.hostAddress = hostAddress;
        factory.httpconnection.timeout = timeout;
        factory.httpconnection.userId = userId;

        // Act
        const instance = factory.httpconnection;

        // Assert
        expect(instance instanceof HttpConnection).toBeTruthy();
    });
});
describe("when asking the factory for an HttpMessageHandler", function() {
    it("it should resolve all dependencies and create an instance", function() {
        // Arrange
        const factory = new Factory();
        const hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
        const timeout = 3000;

        factory.httpmessagehandler.hostAddress = hostAddress;
        factory.httpmessagehandler.timeout = timeout;

        // Act
        const instance = factory.httpmessagehandler;

        // Assert
        expect(instance instanceof HttpMessageHandler).toBeTruthy();
    });
});
