const { EncryptionFactory } = require('D:\\component\\lib\\encryption.factory.js');
const { UserIdentityFactory } = require('D:\\component\\lib\\useridentity.factory.js');
[factoryVariableNames]
const userIdentityFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const userIdentityFactory = new undefinedFactory([refArgsVariableNames]);
    
    const userIdentity = null;
    // Act
    const instance = new EncryptionFactory({ userIdentity });
    // Assert
    expect(instance).not.toBeNull();
  });
});
