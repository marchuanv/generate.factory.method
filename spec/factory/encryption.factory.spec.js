const { createUserIdentity } = require('C:\component\lib\useridentity.factory.js');
const { createEncryption } = require('C:\component\lib\encryption.factory.js');
describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new EncryptionFactory({ userIdentity });
    // Assert
    expect(instance).not.toBeNull();
  });
});
