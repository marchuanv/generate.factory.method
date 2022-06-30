const { HttpConnection } = require('../lib/http/httpconnection');
const { HttpMessageHandler } = require('../lib/http/httpmessagehandler');
const factory = require('../lib/factory');
xdescribe("when asking the factory for an HttpConnection", function() {
    it("it should resolve all dependencies and create an instance", function() {
        // Arrange
        const hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
        const timeout = 3000;
        const userId = 'joe';
        factory.httpconnection.ctorParams.hostAddress = hostAddress;
        factory.httpconnection.ctorParams.timeout = timeout;
        factory.httpconnection.ctorParams.userId = userId;

        // Act
        const instance = factory.httpconnection;

        // Assert
        expect(instance instanceof HttpConnection).toBeTruthy();
    });
});
describe("when asking the factory for an HttpMessageHandler", function() {
    it("it should resolve all dependencies and create an instance", function() {
        // Arrange
        const hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
        const timeout = 3000;
        const userId = 'joe';
        factory.httpmessagehandler.ctorParams.hostAddress = hostAddress;
        factory.httpmessagehandler.ctorParams.timeout = timeout;
        factory.httpmessagehandler.ctorParams.userId = userId;

        // Act
        const instance = factory.httpmessagehandler;

        // Assert
        expect(instance instanceof HttpMessageHandler).toBeTruthy();
    });
});
