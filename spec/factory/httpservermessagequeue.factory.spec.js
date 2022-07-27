const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
describe('when asking the HttpServerMessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageQueueTypeCode} = require('C:\\component\\spec\\factory\\httpservermessagequeue.factory.spec.variables.json');

    // Act
    const {httpServerMessageQueue} = createHttpServerMessageQueue({messageQueueTypeCode});
    // Assert
    expect(httpServerMessageQueue).not.toBeNull();
  });
});
