const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
describe('when asking HttpMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {} = require('C:\\component\\spec\\factory\\httpmessagequeue.factory.spec.variables.json');

    // Act
    const instance = createHttpMessageQueue({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
