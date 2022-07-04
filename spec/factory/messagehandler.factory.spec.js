const { createHttpMessageHandler } = require('C:\component\lib\http\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\component\lib\websocket\websocketmessagehandler.factory.js');
const { createMessageHandler } = require('C:\component\lib\messagehandler.factory.js');
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpMessageHandler = createHttpMessageHandler({httpConnection,httpMessageQueue});
const webSocketMessageHandler = createWebSocketMessageHandler({websocketConnection});
    // Act
    const instance = createMessageHandler({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
