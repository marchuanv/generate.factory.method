const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
describe('when asking MessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const code = ;

    // Act
    const instance = createMessageStatus({ code });
    // Assert
    expect(instance).not.toBeNull();
  });
});
