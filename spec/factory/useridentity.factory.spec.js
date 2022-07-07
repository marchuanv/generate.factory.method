const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
describe('when asking the UserIdentity factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId} = require('C:\\component\\spec\\factory\\useridentity.factory.spec.variables.json');

    // Act
    const instance = createUserIdentity({ userId });
    // Assert
    expect(instance).not.toBeNull();
  });
});
