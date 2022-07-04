const { createUserIdentity } = require('C:\\component\\lib\\useridentity.factory.js');
const { createEncryption } = require('C:\\component\\lib\\encryption.factory.js');
describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userIdentity = createUserIdentity({userId});
    // Act
    const instance = createEncryption({ userIdentity });
    // Assert
    expect(instance).not.toBeNull();
  });
});
