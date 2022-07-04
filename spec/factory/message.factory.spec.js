const { createContent } = require('C:\component\lib\content.factory.js');
const { createMessageStatus } = require('C:\component\lib\messagestatus.factory.js');
const { createMessage } = require('C:\component\lib\message.factory.js');
describe('when asking Message to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const content = createContent({encryption});
const messageStatus = createMessageStatus({});
    // Act
    const instance = createMessage({ content,messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
