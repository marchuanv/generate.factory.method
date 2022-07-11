const { createHttpMessageStatus } = require('C:\\component\\lib\\factory\\httpmessagestatus.factory.js');
describe('when asking the HttpMessageStatus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageStatusCode} = require('C:\\component\\spec\\factory\\httpmessagestatus.factory.spec.variables.json');

    // Act
    const {httpMessageStatus} = createHttpMessageStatus({messageStatusCode});
    // Assert
    expect(httpMessageStatus).not.toBeNull();
  });
});
