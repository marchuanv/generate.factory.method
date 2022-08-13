const { createEventPublisher } = require('D:\\component\\lib\\factory\\eventpublisher.factory.js');
describe('when asking the EventPublisher factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {contextId,eventDescription,eventCode,eventSource} = require('D:\\component\\spec\\factory\\eventpublisher.factory.spec.variables.json');

    // Act
    const {eventPublisher} = createEventPublisher({contextId,eventDescription,eventCode,eventSource});
    // Assert
    expect(eventPublisher).not.toBeNull();
  });
});
