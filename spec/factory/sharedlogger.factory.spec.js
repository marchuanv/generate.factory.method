const { createSharedLogger } = require('D:\\component\\lib\\factory\\sharedlogger.factory.js');
describe('when asking the SharedLogger factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('D:\\component\\spec\\factory\\sharedlogger.factory.spec.variables.json');

    // Act
    const {sharedLogger} = createSharedLogger({});
    // Assert
    expect(sharedLogger).not.toBeNull();
  });
});
