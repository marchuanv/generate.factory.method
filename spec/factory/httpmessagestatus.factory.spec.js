const { createHttpMessageStatus } = require('C:\\component\\lib\\factory\\httpmessagestatus.factory.js');
describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\httpmessagestatus.factory.spec.variables.json');

    // Act
    const instance = createHttpMessageStatus({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
