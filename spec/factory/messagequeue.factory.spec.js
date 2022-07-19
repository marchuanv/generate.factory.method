const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
describe('when asking the SharedMessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\messagequeue.factory.spec.variables.json');

    // Act
    const {sharedMessageQueue} = createSharedMessageQueue({});
    // Assert
    expect(sharedMessageQueue).not.toBeNull();
  });
});
