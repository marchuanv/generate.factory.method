const { createEventPublisher } = require('C:\\component\\lib\\factory\\eventpublisher.factory.js');
describe('when asking the EventPublisher factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {eventCode,eventSource,eventDescription,sharedMessageQueue} = require('C:\\component\\spec\\factory\\eventpublisher.factory.spec.variables.json');

    // Act
    const {eventPublisher} = createEventPublisher({eventDescription,eventCode,eventSource});
    // Assert
    expect(eventPublisher).not.toBeNull();
  });
});
