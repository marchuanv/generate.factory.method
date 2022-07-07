const { createContentMetadata } = require('C:\\component\\lib\\factory\\contentmetadata.factory.js');
describe('when asking the ContentMetadata factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {metadata,data} = require('C:\\component\\spec\\factory\\contentmetadata.factory.spec.variables.json');

    // Act
    const instance = createContentMetadata({metadata,data});
    // Assert
    expect(instance).not.toBeNull();
  });
});
