const { createHttpConnection } = require('D:\\component\\lib\\factory\\httpconnection.factory.js');
describe('when asking the HttpConnection factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,senderHost,senderPort,messageQueueTypeCode} = require('D:\\component\\spec\\factory\\httpconnection.factory.spec.variables.json');

    // Act
    const {httpConnection} = createHttpConnection({timeout,messageQueueTypeCode,senderHost,senderPort});
    // Assert
    expect(httpConnection).not.toBeNull();
  });
});
