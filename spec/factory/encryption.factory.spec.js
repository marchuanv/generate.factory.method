const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
describe('when asking Encryption to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\encryption.factory.spec.variables.json');

    // Act
    const instance = createEncryption({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
