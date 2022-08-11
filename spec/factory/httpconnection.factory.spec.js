const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
describe('when asking the HttpConnection factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,senderHost,senderPort,messageQueueTypeCode,messageQueueContextId} = require('C:\\component\\spec\\factory\\httpconnection.factory.spec.variables.json');

    // Act
    const {httpConnection} = createHttpConnection({timeout,messageQueueContextId,messageQueueTypeCode,senderHost,senderPort});
    // Assert
    expect(httpConnection).not.toBeNull();
  });
});
