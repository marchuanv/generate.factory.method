const { MessageFactory } = require('C:\\component\\lib\\message.factory.js'); 

describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { content,messageStatus } = [Content];
    // Act
    const instance = new MessageFactory({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
