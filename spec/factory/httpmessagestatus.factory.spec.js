const { HttpMessageStatusFactoryFactory } = require('C:\\component\\lib\\http\\httpmessagestatus.factory.js'); 

describe('when asking HttpMessageStatusFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { messageStatus } = [];
    // Act
    const instance = new HttpMessageStatusFactoryFactory({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
