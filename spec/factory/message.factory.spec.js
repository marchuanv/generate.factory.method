const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userId = 'joe';

const userIdentity = createUserIdentity({userId});
const data = 'Hello World';

const metadata = {
    "sender": {
        "host": "localhost",
        "port": 3000
    }
};

const encryption = createEncryption({userIdentity});
const code = 1;

const content = createContent({data,metadata,encryption});
const messageStatus = createMessageStatus({code});
    // Act
    const instance = createMessage({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
