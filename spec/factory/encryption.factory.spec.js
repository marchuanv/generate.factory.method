const { EncryptionFactory } = require('C:\\component\\lib\\encryption.factory.js'); 

describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {} = [];
    const {useridentity} = [UserIdentity];
    // Act
    const instance = new EncryptionFactory({ userIdentity });
    // Assert
    expect(instance).not.toBeNull();
  });
});
