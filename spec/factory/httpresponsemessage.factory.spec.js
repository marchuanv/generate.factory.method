const { HttpResponseMessageFactory } = require('D:\\component\\lib\\http\\httpresponsemessage.factory.js');
const { MessageFactory } = require('D:\\component\\lib\\message.factory.js');
[factoryVariableNames]
const messageFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking HttpResponseMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const messageFactory = new undefinedFactory([refArgsVariableNames]);
    
    const message = null;
    // Act
    const instance = new HttpResponseMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
