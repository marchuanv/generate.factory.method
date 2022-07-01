const { UserIdentityFactoryFactory } = require('C:\\component\\lib\\useridentity.factory.js'); 

describe('when asking UserIdentityFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const {  } = [];
    // Act
    const instance = new UserIdentityFactoryFactory({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
