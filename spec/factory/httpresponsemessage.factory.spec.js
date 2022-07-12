const { createHttpResponseMessage } = require('C:\\component\\lib\\factory\\httpresponsemessage.factory.js');
describe('when asking the HttpResponseMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {host,port,userId,data,token,messageStatusCode} = require('C:\\component\\spec\\factory\\httpresponsemessage.factory.spec.variables.json');

    // Act
    const {httpResponseMessage} = createHttpResponseMessage({host,port,userId,data,token,messageStatusCode});
    // Assert
    expect(httpResponseMessage).not.toBeNull();
  });
});
