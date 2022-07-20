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
    const messageQueueTypeArray = [
      "HttpClientResponseMessage",
      "HttpClientRequestMessage",
      "HttpServerResponseMessage",
      "HttpServerRequestMessage"
    ];

    const { createHttpClientMessageQueue } = require("../../lib/factory/httpclientmessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    const { httpClientMessageQueue } = createHttpClientMessageQueue({
        recipientHost, recipientPort, messageQueueTypeArray, userId, senderHost, senderPort
    });

    // Act
    const { message } = createMessage({ recipientHost, recipientPort, userId, data, senderHost, senderPort, token, metadata, messageStatusCode });
    httpClientMessageQueue.enqueueHttpRequestMessage({ requestMessage: message });

    // Assert
    const { httpRequestMessage } = await httpClientMessageQueue.dequeueHttpRequestMessage();
    expect(httpRequestMessage).not.toBeNull();
  });
  it("it should dequeue server http request messages without error", async function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const userId = 'joe';
    const messageQueueTypeArray = [
      "HttpClientResponseMessage",
      "HttpClientRequestMessage",
      "HttpServerResponseMessage",
      "HttpServerRequestMessage"
    ];

    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { httpServerMessageQueue } = createHttpServerMessageQueue({
        recipientHost, recipientPort, messageQueueTypeArray, userId, senderHost, senderPort
    });
   
    // Act
    httpServerMessageQueue.enqueueHttpRequest({ httpRequest: {
      body: 'Hello World',
      headers: {},
      path: "/test",
      method: "POST"
    }});

    // Assert
    const { httpRequestMessage } = await httpServerMessageQueue.dequeueHttpRequestMessage();
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
    const messageQueueTypeArray = [
      "HttpClientResponseMessage",
      "HttpClientRequestMessage",
      "HttpServerResponseMessage",
      "HttpServerRequestMessage"
    ];
    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    const { httpServerMessageQueue } = createHttpServerMessageQueue({
        recipientHost, recipientPort, messageQueueTypeArray, userId, senderHost, senderPort
    });

    // Act
    const { message } = createMessage({ recipientHost, recipientPort, userId, data, senderHost, senderPort, token, metadata, messageStatusCode });
    httpServerMessageQueue.enqueueHttpResponseMessage({ responseMessage: message });

    // Assert
    const { httpResponseMessage } = await httpServerMessageQueue.dequeueHttpResponseMessage();
    expect(httpResponseMessage).not.toBeNull();
  });
});
