const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
describe('when asking the MessageContent factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {data,messageContentSecurity,userId,metadata} = require('C:\\component\\spec\\factory\\messagecontent.factory.spec.variables.json');

    // Act
    const {messageContent} = createMessageContent({data,userId,metadata});
    // Assert
    expect(messageContent).not.toBeNull();
  });
});
