const { EncryptionFactory } = require('D:\\component\\lib\\encryption.factory.js');
[factoryVariableNames]


describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const userIdentity = null;
    // Act
    const instance = new EncryptionFactory({ userIdentity });
    // Assert
    expect(instance).not.toBeNull();
  });
});
