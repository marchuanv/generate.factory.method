const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createHttpRequestMessage } = require('C:\\component\\lib\\factory\\httprequestmessage.factory.js');
describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,data,metadata,code} = require('C:\\component\\spec\\factory\\httprequestmessage.factory.spec.variables.json');

const messageStatus = createMessageStatus({code});
const userIdentity = createUserIdentity({userId});
const encryption = createEncryption({userIdentity});
const content = createContent({encryption,data,metadata});
const message = createMessage({content,messageStatus});
    // Act
    const instance = createHttpRequestMessage({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
