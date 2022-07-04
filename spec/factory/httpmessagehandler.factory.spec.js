const { HttpMessageHandlerFactory } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js');
const { HttpConnectionFactory } = require('C:\\component\\lib\\http\\httpconnection.factory.js');
const { HttpMessageQueueFactory } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
[factoryVariableNames]
describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
    [refArgsVariableNames]
    [nonRefArgsVariableNames]
    // Act
    const instance = new HttpMessageHandlerFactory({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
