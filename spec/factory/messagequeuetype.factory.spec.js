const { createMessageQueueType } = require('C:\\component\\lib\\factory\\messagequeuetype.factory.js');
describe('when asking the MessageQueueType factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageQueueTypeCode} = require('C:\\component\\spec\\factory\\messagequeuetype.factory.spec.variables.json');

    // Act
    const {messageQueueType} = createMessageQueueType({messageQueueTypeCode});
    // Assert
    expect(messageQueueType).not.toBeNull();
  });
});
