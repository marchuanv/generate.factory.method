const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
describe('when asking the HttpConnection factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {timeout,hostAddress} = require('C:\\component\\spec\\factory\\httpconnection.factory.spec.variables.json');

const httpMessageQueue = createHttpMessageQueue({});
    // Act
    const instance = createHttpConnection({ timeout,httpMessageQueue,hostAddress });
    // Assert
    expect(instance).not.toBeNull();
  });
});
