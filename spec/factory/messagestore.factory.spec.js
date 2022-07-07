const { createMessageStore } = require('C:\\component\\lib\\factory\\messagestore.factory.js');
describe('when asking the MessageStore factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagestore.factory.spec.variables.json');

    // Act
    const instance = createMessageStore({});
    // Assert
    expect(instance).not.toBeNull();
  });
});
