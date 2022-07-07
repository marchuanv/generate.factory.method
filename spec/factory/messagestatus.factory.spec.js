const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
describe('when asking MessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagestatus.factory.spec.variables.json');

    // Act
    const instance = createMessageStatus({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
