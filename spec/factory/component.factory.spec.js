const { createComponent } = require('C:\\component\\lib\\factory\\component.factory.js');
describe('when asking Component to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {packageJson} = require('C:\\component\\spec\\factory\\component.factory.spec.variables.json');

    // Act
    const instance = createComponent({ packageJson });
    // Assert
    expect(instance).not.toBeNull();
  });
});
