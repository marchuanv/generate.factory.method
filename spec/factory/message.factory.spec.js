const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
describe('when asking the Message factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,data,metadata,code} = require('C:\\component\\spec\\factory\\message.factory.spec.variables.json');

const messageStatus = createMessageStatus({code});
const userIdentity = createUserIdentity({userId});
const encryption = createEncryption({userIdentity});
const content = createContent({encryption,data,metadata});
    // Act
    const instance = createMessage({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
