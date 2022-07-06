const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
describe('when asking HttpConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const name = ;

const callback = ;

const httpMessageQueue = createHttpMessageQueue({name,callback});
const hostAddress = ;

const timeout = ;

    // Act
    const instance = createHttpConnection({ httpMessageQueue,hostAddress,timeout });
    // Assert
    expect(instance).not.toBeNull();
  });
});
