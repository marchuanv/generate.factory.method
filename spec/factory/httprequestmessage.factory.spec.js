const { createHttpRequestMessage } = require('C:\\component\\lib\\factory\\httprequestmessage.factory.js');
describe('when asking the HttpRequestMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,data,metadata,messageStatusCode} = require('C:\\component\\spec\\factory\\httprequestmessage.factory.spec.variables.json');

    // Act
    const instance = createHttpRequestMessage({userId,data,metadata,messageStatusCode});
    // Assert
    expect(instance).not.toBeNull();
  });
});
