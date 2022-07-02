const { HttpMessageHandlerFactory } = require('D:\\component\\lib\\http\\httpmessagehandler.factory.js');
[factoryVariableNames]


describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const httpConnection = null;
const httpMessageQueue = null;
    // Act
    const instance = new HttpMessageHandlerFactory({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
