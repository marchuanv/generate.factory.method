const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const encryption = createEncryption({});
const content = createContent({encryption,data,metadata});
const messageStatus = createMessageStatus({});
const {} = require('C:\\component\\spec\\factory\\message.factory.spec.variables.json');

    // Act
    const instance = createMessage({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
