const { createHttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.js');
describe('when asking the HttpServerRequestMessageQueueBinding factory to create an instance of HttpServerRequestMessageQueueBinding', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
};

    // Act
    const {httpServerRequestMessageQueueBinding} = createHttpServerRequestMessageQueueBinding(testInputArgs);

    // Assert
    expect(httpServerRequestMessageQueueBinding).not.toBeNull();

  });
});
