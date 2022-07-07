const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpMessageQueue = createHttpMessageQueue({});
const websocketMessageQueue = createWebSocketMessageQueue({});
const httpConnection = createHttpConnection({timeout,httpMessageQueue,hostAddress});
const websocketConnection = createWebSocketConnection({timeout,websocketMessageQueue,hostAddress});
const httpMessageHandler = createHttpMessageHandler({httpConnection,httpMessageQueue});
const webSocketMessageHandler = createWebSocketMessageHandler({websocketConnection,websocketMessageQueue});
const {} = require('C:\\component\\spec\\factory\\messagehandler.factory.spec.variables.json');

    // Act
    const instance = createMessageHandler({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
