const { HttpConnection } = require('../lib/http/httpconnection');
const factory = require('../lib/factory');
describe("when asking the factory for an instance of a class", function() {
    it("it should resolve and create and object", function() {
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
