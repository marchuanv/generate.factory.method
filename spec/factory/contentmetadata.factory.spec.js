const { createContentMetadata } = require('C:\\component\\lib\\contentmetadata.factory.js');
describe('when asking ContentMetadata to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const metadata = null;

const data = null;

    // Act
    const instance = createContentMetadata({ metadata,data });
    // Assert
    expect(instance).not.toBeNull();
  });
});
