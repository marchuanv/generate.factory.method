const { createHttpMessageQueue } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\http\\httpconnection.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.factory.js');
const { createMessageHandler } = require('C:\\component\\lib\\messagehandler.factory.js');
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpMessageQueue = createHttpMessageQueue({name,callback});
const websocketMessageQueue = createWebSocketMessageQueue({});
const httpConnection = createHttpConnection({httpMessageQueue,hostAddress,timeout});
const websocketConnection = createWebSocketConnection({websocketMessageQueue,hostAddress,timeout});
const httpMessageHandler = createHttpMessageHandler({httpConnection,httpMessageQueue});
const webSocketMessageHandler = createWebSocketMessageHandler({websocketConnection,websocketMessageQueue});
    // Act
    const instance = createMessageHandler({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
