const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
describe('when asking HttpMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {name,callback} = require('C:\\component\\spec\\factory\\httpmessagequeue.factory.spec.variables.json');

    // Act
    const instance = createHttpMessageQueue({ name,callback });
    // Assert
    expect(instance).not.toBeNull();
  });
});
