const { createHttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.js');
describe('when asking the HttpServerResponseMessageQueueBinding factory to create an instance of HttpServerResponseMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
};

    // Act
    const {httpServerResponseMessageQueueBinding} = createHttpServerResponseMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpServerResponseMessageQueueBinding).not.toBeNull();

  });
});
