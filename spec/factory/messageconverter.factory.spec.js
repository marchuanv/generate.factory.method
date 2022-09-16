const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
describe('when asking the MessageConverter factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test"
}

    // Act
    const {messageConverter} = createMessageConverter(testInputArgs);
    // Assert
    expect(messageConverter).not.toBeNull();
  });
});
