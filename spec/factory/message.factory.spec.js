const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
describe('when asking the Message factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,data,metadata,messageStatusCode} = require('C:\\component\\spec\\factory\\message.factory.spec.variables.json');

    // Act
    const instance = createMessage({userId,data,metadata,messageStatusCode});
    // Assert
    expect(instance).not.toBeNull();
  });
});
