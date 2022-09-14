const { createMessageStore } = require('C:\\component\\lib\\factory\\messagestore.factory.js');
describe('when asking the MessageStore factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test"
}
    // Act
    const {messageStore} = createMessageStore(scopeId);
    // Assert
    expect(messageStore).not.toBeNull();
  });
});
