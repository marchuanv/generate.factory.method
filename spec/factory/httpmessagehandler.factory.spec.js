const { HttpMessageHandlerFactory } = require('D:\\component\\lib\\http\\httpmessagehandler.factory.js');
const { HttpConnectionFactory } = require('D:\\component\\lib\\http\\httpconnection.factory.js');
[factoryVariableNames]
const httpConnectionFactory = new undefinedFactory([refArgsVariableNames]);
const httpMessageQueueFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const httpConnectionFactory = new undefinedFactory([refArgsVariableNames]);
const httpMessageQueueFactory = new undefinedFactory([refArgsVariableNames]);
    
    const httpConnection = null;
const httpMessageQueue = null;
    // Act
    const instance = new HttpMessageHandlerFactory({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
