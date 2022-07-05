const { createMessageStatus } = require('C:\\component\\lib\\messagestatus.factory.js');
describe('when asking MessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const code = 1;

    // Act
    const instance = createMessageStatus({ code });
    // Assert
    expect(instance).not.toBeNull();
  });
});
