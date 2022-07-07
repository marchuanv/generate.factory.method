const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
describe('when asking the HttpMessageHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,hostAddress} = require('C:\\component\\spec\\factory\\httpmessagehandler.factory.spec.variables.json');

const httpMessageQueue = createHttpMessageQueue({});
const httpConnection = createHttpConnection({timeout,httpMessageQueue,hostAddress});
    // Act
    const instance = createHttpMessageHandler({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
