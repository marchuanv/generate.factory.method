const { createEventSubscription } = require('C:\\component\\lib\\factory\\eventsubscription.factory.js');
describe('when asking the EventSubscription factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageQueueContextId,subscriptionName,eventDescription,eventCode,eventSource} = require('C:\\component\\spec\\factory\\eventsubscription.factory.spec.variables.json');

    // Act
    const {eventSubscription} = createEventSubscription({messageQueueContextId,eventDescription,eventCode,eventSource,subscriptionName});
    // Assert
    expect(eventSubscription).not.toBeNull();
  });
});
