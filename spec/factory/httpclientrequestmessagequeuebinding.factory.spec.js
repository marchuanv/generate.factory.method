const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
describe('when asking the HttpClientRequestMessageQueueBinding factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {httpClientRequestMessageQueueBinding} = createHttpClientRequestMessageQueueBinding(testInputArgs);
    // Assert
    expect(httpClientRequestMessageQueueBinding).not.toBeNull();
  });
});
