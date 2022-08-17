const { createSharedHttpServer } = require('D:\\component\\lib\\factory\\sharedhttpserver.factory.js');
describe('when asking the SharedHttpServer factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,senderHost,senderPort} = require('D:\\component\\spec\\factory\\sharedhttpserver.factory.spec.variables.json');

    // Act
    const {sharedHttpServer} = createSharedHttpServer({timeout,senderHost,senderPort});
    // Assert
    expect(sharedHttpServer).not.toBeNull();
  });
});
