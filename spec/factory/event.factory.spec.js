const { createEvent } = require('D:\\component\\lib\\factory\\event.factory.js');
describe('when asking the Event factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {eventCode,eventSource,eventDescription} = require('D:\\component\\spec\\factory\\event.factory.spec.variables.json');

    // Act
    const {event} = createEvent({eventDescription,eventCode,eventSource});
    // Assert
    expect(event).not.toBeNull();
  });
});
