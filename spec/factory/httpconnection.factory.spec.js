const { HttpConnectionFactory } = require('C:\\component\\lib\\http\\httpconnection.factory.js');
const { HttpMessageQueueFactory } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
describe('when asking HttpConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const httpMessageQueueFactory = new HttpMessageQueueFactory();
    const httpMessageQueue = httpMessageQueueFactory.create();
    const hostAddress = null;
const timeout = null;
    // Act
    const instance = new HttpConnectionFactory({ httpMessageQueue,hostAddress,timeout });
    // Assert
    expect(instance).not.toBeNull();
  });
});
