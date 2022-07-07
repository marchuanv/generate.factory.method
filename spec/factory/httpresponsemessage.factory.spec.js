const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createHttpResponseMessage } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.js');
describe('when asking the HttpResponseMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,data,metadata,code} = require('C:\\component\\spec\\factory\\httpresponsemessage.factory.spec.variables.json');

const messageStatus = createMessageStatus({code});
const userIdentity = createUserIdentity({userId});
const encryption = createEncryption({userIdentity});
const content = createContent({encryption,data,metadata});
const message = createMessage({content,messageStatus});
    // Act
    const instance = createHttpResponseMessage({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
