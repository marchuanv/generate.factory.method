const { createHttpClientMessageQueue } = require('D:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
describe('when asking the HttpClientMessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageQueueTypeCode} = require('D:\\component\\spec\\factory\\httpclientmessagequeue.factory.spec.variables.json');

    // Act
    const {httpClientMessageQueue} = createHttpClientMessageQueue({messageQueueTypeCode});
    // Assert
    expect(httpClientMessageQueue).not.toBeNull();
  });
});
