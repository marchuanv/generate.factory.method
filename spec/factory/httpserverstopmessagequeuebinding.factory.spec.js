const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');
describe('when asking the HttpServerStopMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,messageQueue} = require('C:\\component\\spec\\factory\\httpserverstopmessagequeuebinding.factory.spec.variables.json');

    // Act
    const {httpServerStopMessageQueueBinding} = createHttpServerStopMessageQueueBinding({scopeId});
    // Assert
    expect(httpServerStopMessageQueueBinding).not.toBeNull();
  });
});
