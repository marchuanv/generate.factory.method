const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
describe('when asking the MessageConverter factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {messageConverter} = createMessageConverter(scopeId);
    // Assert
    expect(messageConverter).not.toBeNull();
  });
});
