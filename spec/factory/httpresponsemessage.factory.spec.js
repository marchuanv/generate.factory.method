const { createUserIdentity } = require('C:\\component\\lib\\useridentity.factory.js');
const { createEncryption } = require('C:\\component\\lib\\encryption.factory.js');
const { createContent } = require('C:\\component\\lib\\content.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\messagestatus.factory.js');
const { createMessage } = require('C:\\component\\lib\\message.factory.js');
const { createHttpResponseMessage } = require('C:\\component\\lib\\http\\httpresponsemessage.factory.js');
describe('when asking HttpResponseMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userIdentity = createUserIdentity({});
const encryption = createEncryption({userIdentity});
const content = createContent({encryption});
const messageStatus = createMessageStatus({});
const message = createMessage({content,messageStatus});
    // Act
    const instance = createHttpResponseMessage({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
