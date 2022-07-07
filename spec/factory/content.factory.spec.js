const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
describe('when asking Content to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const encryption = createEncryption({});
const {datametadata,data,metadata} = require('C:\\component\\spec\\factory\\content.factory.spec.variables.json');

    // Act
    const instance = createContent({ datametadata,encryption,data,metadata });
    // Assert
    expect(instance).not.toBeNull();
  });
});
