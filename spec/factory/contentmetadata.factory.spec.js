const { ContentMetadataFactory } = require('D:\\component\\lib\\contentmetadata.factory.js');
[factoryVariableNames]


describe('when asking ContentMetadata to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const metadata = null;
const data = null;
    // Act
    const instance = new ContentMetadataFactory({ metadata,data });
    // Assert
    expect(instance).not.toBeNull();
  });
});
