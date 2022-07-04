const { createUserIdentity } = require('C:\\component\\lib\\useridentity.factory.js');
const { createEncryption } = require('C:\\component\\lib\\encryption.factory.js');
const { createContent } = require('C:\\component\\lib\\content.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\messagestatus.factory.js');
const { createMessage } = require('C:\\component\\lib\\message.factory.js');
const { createHttpRequestMessage } = require('C:\\component\\lib\\http\\httprequestmessage.factory.js');
describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userIdentity = createUserIdentity({[Args]});
const encryption = createEncryption({[Args]});
const content = createContent({[Args]});
const messageStatus = createMessageStatus({[Args]});
const message = createMessage({[Args]});
    // Act
    const instance = createHttpRequestMessage({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
