const { UserIdentityFactory } = require('C:\\component\\lib\\useridentity.factory.js'); 

describe('when asking UserIdentity to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { userId } = [];
    // Act
    const instance = new UserIdentityFactory({ userId });
    // Assert
    expect(instance).not.toBeNull();
  });
});
