const { HttpMessageStatusFactory } = require('C:\\component\\lib\\http\\httpmessagestatus.factory.js');
const { MessageStatusFactory } = require('C:\\component\\lib\\messagestatus.factory.js');
describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const messageStatusFactory = new MessageStatusFactory();
    const messageStatus = messageStatusFactory.create();
    
    // Act
    const instance = new HttpMessageStatusFactory({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
