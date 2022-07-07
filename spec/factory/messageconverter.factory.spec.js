const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
describe('when asking the MessageConverter factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messageconverter.factory.spec.variables.json');

    // Act
    const instance = createMessageConverter({});
    // Assert
    expect(instance).not.toBeNull();
  });
});
