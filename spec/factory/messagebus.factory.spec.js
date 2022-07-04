const { createMessageHandler } = require('C:\component\lib\messagehandler.factory.js');
const { createMessageBus } = require('C:\component\lib\messagebus.factory.js');
describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const messageHandler = createMessageHandler(test);
    // Act
    const instance = createMessageBus({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
