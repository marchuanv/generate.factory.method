const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
describe('when asking the Encryption factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId} = require('C:\\component\\spec\\factory\\encryption.factory.spec.variables.json');

    // Act
    const instance = createEncryption({userId});
    // Assert
    expect(instance).not.toBeNull();
  });
});
