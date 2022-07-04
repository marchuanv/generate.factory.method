const { createHttpMessageQueue } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\http\\httpconnection.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js');
describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpMessageQueue = createHttpMessageQueue({name,callback});
const httpConnection = createHttpConnection({httpMessageQueue,hostAddress,timeout});
    // Act
    const instance = createHttpMessageHandler({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
