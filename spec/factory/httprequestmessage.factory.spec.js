const { HttpRequestMessageFactory } = require('C:\\component\\lib\\http\\httprequestmessage.factory.js');
[factoryVariableNames]
const messageFactory = new MessageFactory([refArgsVariableNames]);
const { MessageFactory } = require('C:\\component\\lib\\message.factory.js');
describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const messageFactory = new MessageFactory([refArgsVariableNames]);
    const message = messageFactory.create([nonRefArgsVariableNames]);
    
    // Act
    const instance = new HttpRequestMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
