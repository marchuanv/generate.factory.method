const { createHttpRequestMessage } = require('C:\\component\\lib\\factory\\httprequestmessage.factory.js');
describe('when asking the HttpRequestMessage factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {method,host,port,userId,data,token,messageStatusCode,path} = require('C:\\component\\spec\\factory\\httprequestmessage.factory.spec.variables.json');

    // Act
    const {httpRequestMessage} = createHttpRequestMessage({method,host,port,userId,data,token,messageStatusCode,path});
    // Assert
    expect(httpRequestMessage).not.toBeNull();
  });
});
