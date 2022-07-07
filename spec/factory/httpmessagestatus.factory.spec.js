const { createHttpMessageStatus } = require('C:\\component\\lib\\factory\\httpmessagestatus.factory.js');
describe('when asking the HttpMessageStatus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {code} = require('C:\\component\\spec\\factory\\httpmessagestatus.factory.spec.variables.json');

    // Act
    const instance = createHttpMessageStatus(code);
    // Assert
    expect(instance).not.toBeNull();
  });
});
