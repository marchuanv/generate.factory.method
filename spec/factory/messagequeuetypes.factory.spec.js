const { createMessageQueueTypes } = require('C:\\component\\lib\\factory\\messagequeuetypes.factory.js');
describe('when asking the MessageQueueTypes factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagequeuetypes.factory.spec.variables.json');

    // Act
    const {messageQueueTypes} = createMessageQueueTypes({});
    // Assert
    expect(messageQueueTypes).not.toBeNull();
  });
});
