const { HttpConnectionFactory } = require('C:\\component\\lib\\http\\httpconnection.factory.js'); 

describe('when asking HttpConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {hostAddress,timeout} = [];
    const {httpMessageQueue} = [HttpMessageQueue];
    // Act
    const instance = new HttpConnectionFactory({ httpMessageQueue,hostAddress,timeout });
    // Assert
    expect(instance).not.toBeNull();
  });
});
