const { HttpConnectionFactory } = require('D:\\component\\lib\\http\\httpconnection.factory.js');
[factoryVariableNames]


describe('when asking HttpConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const httpMessageQueue = null;
const hostAddress = null;
const timeout = null;
    // Act
    const instance = new HttpConnectionFactory({ httpMessageQueue,hostAddress,timeout });
    // Assert
    expect(instance).not.toBeNull();
  });
});
