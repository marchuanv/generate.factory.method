const { createHttpClientMessageBus } = require('D:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
describe('when asking the HttpClientMessageBus factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {contextId,timeout,eventLogger} = require('D:\\component\\spec\\factory\\httpclientmessagebus.factory.spec.variables.json');

    // Act
    const {httpClientMessageBus} = createHttpClientMessageBus({timeout,contextId});
    // Assert
    expect(httpClientMessageBus).not.toBeNull();
  });
});
