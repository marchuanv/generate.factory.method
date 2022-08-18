const { createHttpServer } = require('C:\\component\\lib\\factory\\httpserver.factory.js');
describe('when asking the HttpServer factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,senderHost,senderPort} = require('C:\\component\\spec\\factory\\httpserver.factory.spec.variables.json');

    // Act
    const {httpServer} = createHttpServer({timeout,senderHost,senderPort});
    // Assert
    expect(httpServer).not.toBeNull();
  });
});
