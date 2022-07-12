const { createMessageContent } = require('C:\\component\\lib\\factory\\messagecontent.factory.js');
describe('when asking the MessageContent factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {host,port,userId,data,token} = require('C:\\component\\spec\\factory\\messagecontent.factory.spec.variables.json');

    // Act
    const {messageContent} = createMessageContent({userId,data,host,port,token});
    // Assert
    expect(messageContent).not.toBeNull();
  });
});
