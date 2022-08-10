const { createSharedMessageConverter } = require('D:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
describe('when asking the SharedMessageConverter factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('D:\\component\\spec\\factory\\sharedmessageconverter.factory.spec.variables.json');

    // Act
    const {sharedMessageConverter} = createSharedMessageConverter({});
    // Assert
    expect(sharedMessageConverter).not.toBeNull();
  });
});
