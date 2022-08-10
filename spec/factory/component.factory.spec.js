const { createComponent } = require('D:\\component\\lib\\factory\\component.factory.js');
describe('when asking the Component factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {packageJson} = require('D:\\component\\spec\\factory\\component.factory.spec.variables.json');

    // Act
    const {component} = createComponent({packageJson});
    // Assert
    expect(component).not.toBeNull();
  });
});
