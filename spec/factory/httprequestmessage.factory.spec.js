const { HttpRequestMessageFactory } = require('D:\\component\\lib\\http\\httprequestmessage.factory.js');
const { MessageFactory } = require('D:\\component\\lib\\message.factory.js');
[factoryVariableNames]
const messageFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const messageFactory = new undefinedFactory([refArgsVariableNames]);
    
    const message = null;
    // Act
    const instance = new HttpRequestMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
