const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const name = ;

const callback = ;

const httpMessageQueue = createHttpMessageQueue({name,callback});
const hostAddress = ;

const timeout = ;

const httpConnection = createHttpConnection({httpMessageQueue,hostAddress,timeout});
    // Act
    const instance = createHttpMessageHandler({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
