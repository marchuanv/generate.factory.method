const { createHttpRequestMessage } = require('C:\\component\\lib\\factory\\httprequestmessage.factory.js');
describe('when asking HttpRequestMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\httprequestmessage.factory.spec.variables.json');

    // Act
    const instance = createHttpRequestMessage({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
