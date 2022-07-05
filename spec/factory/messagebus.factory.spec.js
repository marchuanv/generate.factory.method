const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createMessageBus } = require('C:\\component\\lib\\factory\\messagebus.factory.js');
describe('when asking MessageBus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const name = 'name?';

const callback = '() => {}';

const httpMessageQueue = createHttpMessageQueue({name,callback});
const hostAddress = {
    "host": "localhost",
    "port": 3000
};

const timeout = 5000;

const websocketMessageQueue = createWebSocketMessageQueue({});
const httpConnection = createHttpConnection({httpMessageQueue,hostAddress,timeout});
const websocketConnection = createWebSocketConnection({websocketMessageQueue,hostAddress,timeout});
const httpMessageHandler = createHttpMessageHandler({httpConnection,httpMessageQueue});
const webSocketMessageHandler = createWebSocketMessageHandler({websocketConnection,websocketMessageQueue});
const messageHandler = createMessageHandler({httpMessageHandler,webSocketMessageHandler});
    // Act
    const instance = createMessageBus({ messageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
