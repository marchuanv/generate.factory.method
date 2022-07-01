const { MessageStoreFactoryFactory } = require('C:\\component\\lib\\messagestore.factory.js'); 

describe('when asking MessageStoreFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {  } = [];
    // Act
    const instance = new MessageStoreFactoryFactory({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
