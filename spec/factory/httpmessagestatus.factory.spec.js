const { HttpMessageStatusFactory } = require('C:\\component\\lib\\http\\httpmessagestatus.factory.js'); 

describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { messageStatus } = [];
    // Act
    const instance = new HttpMessageStatusFactory({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
