const { createHttpResponseMessage } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.js');
describe('when asking the HttpResponseMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,data,metadata,messageStatusCode} = require('C:\\component\\spec\\factory\\httpresponsemessage.factory.spec.variables.json');

    // Act
    const {httpResponseMessage} = createHttpResponseMessage({userId,data,metadata,messageStatusCode});
    // Assert
    expect(httpResponseMessage).not.toBeNull();
  });
});
