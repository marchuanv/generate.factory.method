const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
describe('when asking the MessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageQueueTypeCode,messageQueueArray} = require('C:\\component\\spec\\factory\\messagequeue.factory.spec.variables.json');

    // Act
    const {messageQueue} = createMessageQueue({messageQueueTypeCode});
    // Assert
    expect(messageQueue).not.toBeNull();
  });
});
