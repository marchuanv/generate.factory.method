const { MessageStatusFactory } = require('D:\\component\\lib\\messagestatus.factory.js');
[factoryVariableNames]


describe('when asking MessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const code = null;
    // Act
    const instance = new MessageStatusFactory({ code });
    // Assert
    expect(instance).not.toBeNull();
  });
});
