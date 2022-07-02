const { MessageHandlerFactory } = require('D:\\component\\lib\\messagehandler.factory.js');
[requireScripts]
describe('when asking MessageHandler to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
    [refArgsVariableNames]
    [nonRefArgsVariableNames]
    // Act
    const instance = new MessageHandlerFactory({ httpMessageHandler,webSocketMessageHandler });
    // Assert
    expect(instance).not.toBeNull();
  });
});
