const { HttpConnection } = require('../lib/http/httpconnection');
const factory = require('../lib/factory');
describe("when asking the factory for an instance of a class", function() {
    it("it should returned ctor paramters template", function() {
        // Arrange
        // Act
        const parameters = factory.getCtorParameters(HttpConnection);
        // Assert
        expect(parameters).not.toBeNull();
    });
    it("it should resolve and create and object", function() {
        // Arrange
        const parameters = factory.getCtorParameters(HttpConnection);
        const hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
        const timeout = 3000;
        const userId = 'joe';
        parameters.hostAddress = hostAddress;
        parameters.timeout = timeout;
        parameters.userId = userId;

        // Act
        const instance = factory.get(HttpConnection, parameters);

        // Assert
        expect(instance instanceof HttpConnection).toBeTruthy();
    });
});
