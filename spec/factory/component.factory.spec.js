const { ComponentFactoryFactory } = require('C:\\component\\lib\\component.factory.js'); 

describe('when asking ComponentFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { packageJson } = [];
    // Act
    const instance = new ComponentFactoryFactory({ packageJson });
    // Assert
    expect(instance).not.toBeNull();
  });
});
