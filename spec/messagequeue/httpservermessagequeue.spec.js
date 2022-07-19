const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
const { createHttpClientMessageQueue } = require("../../lib/factory/httpclientmessagequeue.factory");
const { createMessage } = require("../../lib/factory/message.factory");
describe("when asking", function() {
  it("it should", async function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const userId = 'joe';
    const messageStatusCode = 2;
    const metadata = {};
    const data = 'Hello World';
    const token = null;
    let _httpClientMessageQueue01 = null;
    let _httpClientMessageQueue02 = null;
    {
      ({ httpClientMessageQueue: _httpClientMessageQueue01 } = createHttpClientMessageQueue({
        recipientHost, recipientPort, userId, 
        senderHost, senderPort
      }));
    }
    {
      ({ httpClientMessageQueue: _httpClientMessageQueue02 } = createHttpClientMessageQueue({
        recipientHost, recipientPort, userId, 
        senderHost, senderPort
      }));
    }

    // Act
    {
      _httpClientMessageQueue01.sync({ httpClientMessageQueue:  _httpClientMessageQueue02 });
      const { message } = createMessage({ recipientHost, recipientPort, userId, data, senderHost, senderPort, token, metadata, messageStatusCode });
      _httpClientMessageQueue01.enqueueHttpRequestMessage({ requestMessage: message });
    }

    // Assert
    const { httpRequestMessage } = await _httpClientMessageQueue02.dequeueHttpRequestMessage();
    expect(httpRequestMessage).not.toBeNull();
  });
});
