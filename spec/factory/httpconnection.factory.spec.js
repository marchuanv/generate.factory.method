const { HttpConnectionFactory } = require('D:\\component\\lib\\http\\httpconnection.factory.js');
const { HttpMessageQueueFactory } = require('D:\\component\\lib\\http\\httpmessagequeue.factory.js');
[factoryVariableNames]
const httpMessageQueueFactory = new undefinedFactory([refArgsVariableNames]);
const hostAddressFactory = new undefinedFactory([refArgsVariableNames]);
const timeoutFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking HttpConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const httpMessageQueueFactory = new undefinedFactory([refArgsVariableNames]);
const hostAddressFactory = new undefinedFactory([refArgsVariableNames]);
const timeoutFactory = new undefinedFactory([refArgsVariableNames]);
    
    const httpMessageQueue = null;
const hostAddress = null;
const timeout = null;
    // Act
    const instance = new HttpConnectionFactory({ httpMessageQueue,hostAddress,timeout });
    // Assert
    expect(instance).not.toBeNull();
  });
});
