const { createSharedMessageQueues } = require('C:\\component\\lib\\factory\\sharedmessagequeues.factory.js');
describe('when asking the SharedMessageQueues factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\sharedmessagequeues.factory.spec.variables.json');

    // Act
    const {sharedMessageQueues} = createSharedMessageQueues({});
    // Assert
    expect(sharedMessageQueues).not.toBeNull();
  });
});
