const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId} = require('C:\\component\\spec\\factory\\encryption.factory.spec.variables.json');

const userIdentity = createUserIdentity({userId});
    // Act
    const instance = createEncryption({ userIdentity });
    // Assert
    expect(instance).not.toBeNull();
  });
});
