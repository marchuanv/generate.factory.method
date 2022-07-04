const { createMessage } = require('C:\component\lib\message.factory.js');
const { createHttpResponseMessage } = require('C:\component\lib\http\httpresponsemessage.factory.js');
describe('when asking HttpResponseMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = createHttpResponseMessage({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
