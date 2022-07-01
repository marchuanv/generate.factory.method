const { HttpRequestMessageFactory } = require('C:\\component\\lib\\http\\httprequestmessage.factory.js'); 

describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {} = [];
    const {message} = [Message];
    // Act
    const instance = new HttpRequestMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
