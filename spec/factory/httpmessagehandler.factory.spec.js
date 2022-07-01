const { HttpMessageHandlerFactoryFactory } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js'); 

describe('when asking HttpMessageHandlerFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { httpConnection,httpMessageQueue } = [];
    // Act
    const instance = new HttpMessageHandlerFactoryFactory({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
