const { createUserIdentity } = require('C:\\component\\lib\\useridentity.factory.js');
describe('when asking UserIdentity to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userId = 'joe';

    // Act
    const instance = createUserIdentity({ userId });
    // Assert
    expect(instance).not.toBeNull();
  });
});
