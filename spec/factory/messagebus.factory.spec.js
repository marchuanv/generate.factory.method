const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { createMessageBus } = require('C:\\component\\lib\\factory\\messagebus.factory.js');
describe('when asking the MessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,hostAddress} = require('C:\\component\\spec\\factory\\messagebus.factory.spec.variables.json');

const websocketMessageQueue = createWebSocketMessageQueue({});
const websocketConnection = createWebSocketConnection({timeout,websocketMessageQueue,hostAddress});
const webSocketMessageHandler = createWebSocketMessageHandler({websocketConnection,websocketMessageQueue});
const httpMessageQueue = createHttpMessageQueue({});
const httpConnection = createHttpConnection({timeout,httpMessageQueue,hostAddress});
const httpMessageHandler = createHttpMessageHandler({httpConnection,httpMessageQueue});
const messageHandler = createMessageHandler({httpMessageHandler,webSocketMessageHandler});
    // Act
    const instance = createMessageBus({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
