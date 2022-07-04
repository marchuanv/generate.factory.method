const { createMessage } = require('C:\component\lib\message.factory.js');
const { createHttpRequestMessage } = require('C:\component\lib\http\httprequestmessage.factory.js');
describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userIdentity = createUserIdentity({});
const encryption = createEncryption({userIdentity});
const content = createContent({encryption});
const messageStatus = createMessageStatus({});
const message = createMessage({content,messageStatus});
    // Act
    const instance = createHttpRequestMessage({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
