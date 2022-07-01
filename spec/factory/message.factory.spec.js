const { MessageFactory } = require('C:\\component\\lib\\message.factory.js'); 

describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {} = [];
    const {content,messageStatus} = [Content,MessageStatus];
    // Act
    const instance = new MessageFactory({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
