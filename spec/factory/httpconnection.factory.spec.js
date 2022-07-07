const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
describe('when asking HttpConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpMessageQueue = createHttpMessageQueue({});
const {httpMessageQueuehostAddress,timeout,hostAddress} = require('C:\\component\\spec\\factory\\httpconnection.factory.spec.variables.json');

    // Act
    const instance = createHttpConnection({ timeout,httpMessageQueue,hostAddress });
    // Assert
    expect(instance).not.toBeNull();
  });
});
