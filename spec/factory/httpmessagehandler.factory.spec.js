const { createHttpMessageHandler } = require('D:\\component\\lib\\factory\\httpmessagehandler.factory.js');
describe('when asking the HttpMessageHandler factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {messageQueueTypeCode} = require('D:\\component\\spec\\factory\\httpmessagehandler.factory.spec.variables.json');

    // Act
    const {httpMessageHandler} = createHttpMessageHandler({messageQueueTypeCode});
    // Assert
    expect(httpMessageHandler).not.toBeNull();
  });
});
