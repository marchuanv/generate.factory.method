const { MessageFactory } = require('D:\\component\\lib\\message.factory.js');
[factoryVariableNames]


describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const content = null;
const messageStatus = null;
    // Act
    const instance = new MessageFactory({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
