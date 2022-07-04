const { createHttpMessageQueue } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\http\\httpconnection.factory.js');
const { createHttpMessageQueue } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js');
const { createMessageHandler } = require('C:\\component\\lib\\messagehandler.factory.js');
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpMessageQueue = createHttpMessageQueue({});
const httpConnection = createHttpConnection({httpMessageQueue});
const httpMessageQueue = createHttpMessageQueue({});
const httpMessageHandler = createHttpMessageHandler({httpConnection,httpMessageQueue});
const websocketMessageQueue = createWebSocketMessageQueue({});
const websocketConnection = createWebSocketConnection({websocketMessageQueue});
const websocketMessageQueue = createWebSocketMessageQueue({});
const webSocketMessageHandler = createWebSocketMessageHandler({websocketConnection,websocketMessageQueue});
    // Act
    const instance = createMessageHandler({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
