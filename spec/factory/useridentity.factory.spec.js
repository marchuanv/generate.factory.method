const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
describe('when asking UserIdentity to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userId = ;

    // Act
    const instance = createUserIdentity({ userId });
    // Assert
    expect(instance).not.toBeNull();
  });
});
