const { HttpRequestMessageFactory } = require('C:\\component\\lib\\http\\httprequestmessage.factory.js');
const { MessageFactory } = require('C:\\component\\lib\\message.factory.js');
describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const messageFactory = new MessageFactory();
    const message = messageFactory.create();
    
    // Act
    const instance = new HttpRequestMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
