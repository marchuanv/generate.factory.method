const { createHttpResponseMessage } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.js');
describe('when asking HttpResponseMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\httpresponsemessage.factory.spec.variables.json');

    // Act
    const instance = createHttpResponseMessage({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
