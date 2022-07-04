const { createWebsockMessageQueue } = require('C:\component\lib\websocket\websockMessageQueue.factory.js');
describe('when asking WebsockMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [SpecArrangeVariables]
    // Act
    const instance = createWebsockMessageQueue({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
