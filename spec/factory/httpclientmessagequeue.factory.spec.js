const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
describe('when asking the HttpClientMessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {contextId} = require('C:\\component\\spec\\factory\\httpclientmessagequeue.factory.spec.variables.json');

    // Act
    const {httpClientMessageQueue} = createHttpClientMessageQueue({contextId});
    // Assert
    expect(httpClientMessageQueue).not.toBeNull();
  });
});
