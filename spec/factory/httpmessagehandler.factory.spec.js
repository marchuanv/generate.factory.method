const { HttpMessageHandlerFactory } = require('C:\\component\\lib\\http\\httpmessagehandler.factory.js');
const { HttpConnectionFactory } = require('C:\\component\\lib\\http\\httpconnection.factory.js');
const { HttpMessageQueueFactory } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
describe('when asking HttpMessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpConnectionFactory = new HttpConnectionFactory();
const httpMessageQueueFactory = new HttpMessageQueueFactory();
    const httpConnection = httpConnectionFactory.create();
const httpMessageQueue = httpMessageQueueFactory.create();
    
    // Act
    const instance = new HttpMessageHandlerFactory({ httpConnection,httpMessageQueue });
    // Assert
    expect(instance).not.toBeNull();
  });
});
