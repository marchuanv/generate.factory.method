const { createHttpClientRequestMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.js');
describe('when asking the HttpClientRequestMessageBus factory to create an instance of HttpClientRequestMessageBus', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
};

    // Act
    const {httpClientRequestMessageBus} = createHttpClientRequestMessageBus(testInputArgs);

    // Assert
    expect(httpClientRequestMessageBus).not.toBeNull();

  });
});
