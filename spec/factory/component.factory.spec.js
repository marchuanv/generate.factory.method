const { ComponentFactory } = require('D:\\component\\lib\\component.factory.js');
[factoryVariableNames]


describe('when asking Component to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const packageJson = null;
    // Act
    const instance = new ComponentFactory({ packageJson });
    // Assert
    expect(instance).not.toBeNull();
  });
});
