const { MessageFactory } = require('C:\\component\\lib\\message.factory.js');
const { ContentFactory } = require('C:\\component\\lib\\content.factory.js');
const { MessageStatusFactory } = require('C:\\component\\lib\\messagestatus.factory.js');
describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const contentFactory = new ContentFactory();
const messageStatusFactory = new MessageStatusFactory();
    const content = contentFactory.create();
const messageStatus = messageStatusFactory.create();
    
    // Act
    const instance = new MessageFactory({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
