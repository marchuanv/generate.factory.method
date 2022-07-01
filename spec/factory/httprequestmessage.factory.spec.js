const { HttpRequestMessageFactoryFactory } = require('C:\\component\\lib\\http\\httprequestmessage.factory.js'); 

describe('when asking HttpRequestMessageFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { message } = [];
    // Act
    const instance = new HttpRequestMessageFactoryFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
