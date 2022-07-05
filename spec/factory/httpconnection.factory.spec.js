const { createHttpMessageQueue } = require('C:\\component\\lib\\http\\httpmessagequeue.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\http\\httpconnection.factory.js');
describe('when asking HttpConnection to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const name = 'undefined';

const callback = 'undefined';

const httpMessageQueue = createHttpMessageQueue({name,callback});
const hostAddress = 'undefined';

const timeout = 'undefined';

    // Act
    const instance = createHttpConnection({ httpMessageQueue,hostAddress,timeout });
    // Assert
    expect(instance).not.toBeNull();
  });
});
