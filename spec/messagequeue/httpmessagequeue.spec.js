describe("when queuing http messages", function() {
  it("it should dequeue http request messages without error", async function() {

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
    const { createHttpClientMessageQueue } = require("../../lib/factory/httpclientmessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
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
  it("it should dequeue server http request messages without error", async function() {

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
    let _httpServerMessageQueue01 = null;
    let _httpServerMessageQueue02 = null;
    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    {
      ({ httpServerMessageQueue: _httpServerMessageQueue01 } = createHttpServerMessageQueue({
        recipientHost, recipientPort, userId, 
        senderHost, senderPort
      }));
    }
    {
      ({ httpServerMessageQueue: _httpServerMessageQueue02 } = createHttpServerMessageQueue({
        recipientHost, recipientPort, userId, 
        senderHost, senderPort
      }));
    }

    // Act
    {
      _httpServerMessageQueue01.sync({ httpServerMessageQueue:  _httpServerMessageQueue02 });
      _httpServerMessageQueue01.enqueueHttpRequest({ httpRequest: {
        body: 'Hello World',
        headers: {},
        path: "/test",
        method: "POST"
      }});
    }

    // Assert
    const { httpRequestMessage } = await _httpServerMessageQueue02.dequeueHttpRequestMessage();
    expect(httpRequestMessage).not.toBeNull();
  });
  it("it should dequeue server http response messages without error", async function() {

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
    let _httpServerMessageQueue01 = null;
    let _httpServerMessageQueue02 = null;
    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    {
      ({ httpServerMessageQueue: _httpServerMessageQueue01 } = createHttpServerMessageQueue({
        recipientHost, recipientPort, userId, 
        senderHost, senderPort
      }));
    }
    {
      ({ httpServerMessageQueue: _httpServerMessageQueue02 } = createHttpServerMessageQueue({
        recipientHost, recipientPort, userId, 
        senderHost, senderPort
      }));
    }

    // Act
    {
      _httpServerMessageQueue01.sync({ httpServerMessageQueue:  _httpServerMessageQueue02 });
      const { message } = createMessage({ recipientHost, recipientPort, userId, data, senderHost, senderPort, token, metadata, messageStatusCode });
      _httpServerMessageQueue01.enqueueHttpResponseMessage({ responseMessage: message });
    }

    // Assert
    const { httpResponseMessage } = await _httpServerMessageQueue02.dequeueHttpResponseMessage();
    expect(httpResponseMessage).not.toBeNull();
  });
});
