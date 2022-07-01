const { EncryptionFactory } = require('C:\\component\\lib\\encryption.factory.js');
[factoryVariableNames]
const userIdentityFactory = new UserIdentityFactory([refArgsVariableNames]);
const { UserIdentityFactory } = require('C:\\component\\lib\\useridentity.factory.js');
describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const userIdentityFactory = new UserIdentityFactory([refArgsVariableNames]);
    const userIdentity = userIdentityFactory.create([nonRefArgsVariableNames]);
    
    // Act
    const instance = new EncryptionFactory({ userIdentity });
    // Assert
    expect(instance).not.toBeNull();
  });
});
