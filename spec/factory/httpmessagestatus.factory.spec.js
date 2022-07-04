const { createMessageStatus } = require('C:\component\lib\messagestatus.factory.js');
const { createHttpMessageStatus } = require('C:\component\lib\http\httpmessagestatus.factory.js');
describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = createHttpMessageStatus({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
