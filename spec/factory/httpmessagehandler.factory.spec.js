const { HttpMessageHandlerFactory } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js');
[factoryVariableNames]
const httpConnectionFactory = new HttpConnectionFactory([refArgsVariableNames]);
const httpMessageQueueFactory = new HttpMessageQueueFactory([refArgsVariableNames]);
const { HttpConnectionFactory } = require('C:\\component\\lib\\http\\httpconnection.factory.js');
const { HttpMessageQueueFactory } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const httpConnectionFactory = new HttpConnectionFactory([refArgsVariableNames]);
const httpMessageQueueFactory = new HttpMessageQueueFactory([refArgsVariableNames]);
    const httpConnection = httpConnectionFactory.create([nonRefArgsVariableNames]);
const httpMessageQueue = httpMessageQueueFactory.create([nonRefArgsVariableNames]);
    
    // Act
    const instance = new HttpMessageHandlerFactory({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
