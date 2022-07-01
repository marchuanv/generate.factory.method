const { ContentMetadataFactory } = require('C:\\component\\lib\\contentmetadata.factory.js'); 

describe('when asking ContentMetadata to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {metadata,data} = [];
    const {} = [];
    // Act
    const instance = new ContentMetadataFactory({ metadata,data });
    // Assert
    expect(instance).not.toBeNull();
  });
});
