const { EncryptionFactoryFactory } = require('C:\\component\\lib\\encryption.factory.js'); 

describe('when asking EncryptionFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {  } = [];
    // Act
    const instance = new EncryptionFactoryFactory({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
