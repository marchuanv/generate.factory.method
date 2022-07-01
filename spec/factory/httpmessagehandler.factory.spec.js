const { HttpMessageHandlerFactory } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js'); 
describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpConnection = new HttpConnection();
const httpMessageQueue = new HttpMessageQueue();
    const {} = [];
    // Act
    const instance = new HttpMessageHandlerFactory({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
