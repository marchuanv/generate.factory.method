const { createHttpConnection } = require('C:\component\lib\http\httpconnection.factory.js');
const { createHttpMessageQueue } = require('C:\component\lib\http\httpmessagequeue.factory.js');
const { createHttpMessageHandler } = require('C:\component\lib\http\httpmessagehandler.factory.js');
describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = createHttpMessageHandler({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
