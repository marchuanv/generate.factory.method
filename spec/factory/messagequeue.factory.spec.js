const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
describe('when asking the MessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,senderHost,senderPort} = require('C:\\component\\spec\\factory\\messagequeue.factory.spec.variables.json');

    // Act
    const {messageQueue} = createMessageQueue({userId,senderHost,senderPort});
    // Assert
    expect(messageQueue).not.toBeNull();
  });
});
