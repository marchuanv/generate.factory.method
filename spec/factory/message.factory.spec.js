const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
describe('when asking the Message factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {host,port,userId,data,token,messageStatusCode} = require('C:\\component\\spec\\factory\\message.factory.spec.variables.json');

    // Act
    const {message} = createMessage({host,port,userId,data,token,messageStatusCode});
    // Assert
    expect(message).not.toBeNull();
  });
});
