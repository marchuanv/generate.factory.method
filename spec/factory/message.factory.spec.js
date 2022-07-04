const { createUserIdentity } = require('C:\\component\\lib\\useridentity.factory.js');
const { createEncryption } = require('C:\\component\\lib\\encryption.factory.js');
const { createContent } = require('C:\\component\\lib\\content.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\messagestatus.factory.js');
const { createMessage } = require('C:\\component\\lib\\message.factory.js');
describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userId = null;

const userIdentity = null;

const data = null;

const metadata = null;

const code = null;

const userIdentity = createUserIdentity({userId});
const encryption = createEncryption({userIdentity});
const content = createContent({data,metadata,encryption});
const messageStatus = createMessageStatus({code});
    // Act
    const instance = createMessage({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
