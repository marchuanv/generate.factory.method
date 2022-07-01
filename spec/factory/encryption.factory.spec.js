const { EncryptionFactory } = require('C:\\component\\lib\\encryption.factory.js');
const { UserIdentityFactory } = require('C:\\component\\lib\\useridentity.factory.js');
describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userIdentityFactory = new UserIdentityFactory();
    const userIdentity = userIdentityFactory.create();
    
    // Act
    const instance = new EncryptionFactory({ userIdentity });
    // Assert
    expect(instance).not.toBeNull();
  });
});
