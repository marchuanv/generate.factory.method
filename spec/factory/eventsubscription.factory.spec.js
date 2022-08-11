const { createEventSubscription } = require('C:\\component\\lib\\factory\\eventsubscription.factory.js');
describe('when asking the EventSubscription factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {eventCode,eventSource,eventDescription,sharedMessageQueue} = require('C:\\component\\spec\\factory\\eventsubscription.factory.spec.variables.json');

    // Act
    const {eventSubscription} = createEventSubscription({eventDescription,eventCode,eventSource});
    // Assert
    expect(eventSubscription).not.toBeNull();
  });
});
