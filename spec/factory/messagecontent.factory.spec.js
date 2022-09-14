const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
describe('when asking the MessageContent factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,data,metadata,recipientHost,recipientPort,senderHost,senderPort,token} = require('C:\\component\\spec\\factory\\messagecontent.factory.spec.variables.json');

    // Act
    const {messageContent} = createMessageContent({scopeId,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    // Assert
    expect(messageContent).not.toBeNull();
  });
});
