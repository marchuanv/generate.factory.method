const { ContentMetadataFactoryFactory } = require('C:\\component\\lib\\contentmetadata.factory.js'); 

describe('when asking ContentMetadataFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { metadata,data } = [];
    // Act
    const instance = new ContentMetadataFactoryFactory({ metadata,data });
    // Assert
    expect(instance).not.toBeNull();
  });
});
