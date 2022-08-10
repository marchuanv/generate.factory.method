const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
describe('when asking the SharedMessageQueue factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('D:\\component\\spec\\factory\\sharedmessagequeue.factory.spec.variables.json');

    // Act
    const {sharedMessageQueue} = createSharedMessageQueue({});
    // Assert
    expect(sharedMessageQueue).not.toBeNull();
  });
});
