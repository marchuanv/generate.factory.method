const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
describe('when asking the SharedMessageConverter factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\sharedmessageconverter.factory.spec.variables.json');

    // Act
    const {sharedMessageConverter} = createSharedMessageConverter({});
    // Assert
    expect(sharedMessageConverter).not.toBeNull();
  });
});
