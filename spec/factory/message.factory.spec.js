const { MessageFactoryFactory } = require('C:\\component\\lib\\message.factory.js'); 

describe('when asking MessageFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { content,messageStatus } = [];
    // Act
    const instance = new MessageFactoryFactory({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
