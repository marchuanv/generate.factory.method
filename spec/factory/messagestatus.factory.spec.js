const { MessageStatusFactoryFactory } = require('C:\\component\\lib\\messagestatus.factory.js'); 

describe('when asking MessageStatusFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { code } = [];
    // Act
    const instance = new MessageStatusFactoryFactory({ code });
    // Assert
    expect(instance).not.toBeNull();
  });
});
