const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
describe('when asking the HttpServerResponseMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\httpserverresponsemessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpServerResponseMessageQueueBinding} = createHttpServerResponseMessageQueueBinding({scopeId});
    // Assert
    expect(httpServerResponseMessageQueueBinding).not.toBeNull();
  });
});
