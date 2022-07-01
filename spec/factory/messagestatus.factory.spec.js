const { MessageStatusFactory } = require('C:\\component\\lib\\messagestatus.factory.js'); 

describe('when asking MessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { code } = [{  }];
    // Act
    const instance = new MessageStatusFactory({ code });
    // Assert
    expect(instance).not.toBeNull();
  });
});
