const { createMessageStore } = require('C:\\component\\lib\\factory\\messagestore.factory.js');
describe('when asking the MessageStore factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId} = require('C:\\component\\spec\\factory\\messagestore.factory.spec.variables.json');

    // Act
    const {messageStore} = createMessageStore({scopeId});
    // Assert
    expect(messageStore).not.toBeNull();
  });
});
