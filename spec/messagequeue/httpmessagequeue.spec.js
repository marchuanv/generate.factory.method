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
    const messageQueueTypeCode = 2;
    let httpClientMessageQueue01 = null;
    let httpClientMessageQueue02 = null;
    const messageQueueArray = []; //shared messages

    const { createHttpClientMessageQueue } = require("../../lib/factory/httpclientmessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    {
      ({ httpClientMessageQueue: httpClientMessageQueue01 } = createHttpClientMessageQueue({
          recipientHost, recipientPort, messageQueueTypeCode, messageQueueArray, userId, senderHost, senderPort
      }));
    }
    {
      ({ httpClientMessageQueue: httpClientMessageQueue02 } = createHttpClientMessageQueue({
          recipientHost, recipientPort, messageQueueTypeCode, messageQueueArray, userId, senderHost, senderPort
      }));
    }

    // Act
    {
      const { message } = createMessage({ recipientHost, recipientPort, userId, data, senderHost, senderPort, token, metadata, messageStatusCode });
      httpClientMessageQueue01.enqueueHttpRequestMessage({ requestMessage: message });
    }

    // Assert
    const { httpRequestMessage } = await httpClientMessageQueue02.dequeueHttpRequestMessage();
    expect(httpRequestMessage).not.toBeNull();
  });
  it("it should dequeue server http request messages without error", async function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const userId = 'joe';
    const messageQueueTypeCode = 2;
    let httpServerMessageQueue01 = null;
    let httpServerMessageQueue02 = null;
    const messageQueueArray = []; //shared messages

    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    {
      ({ httpServerMessageQueue: httpServerMessageQueue01 } = createHttpServerMessageQueue({
          recipientHost, recipientPort, messageQueueTypeCode, messageQueueArray, userId, senderHost, senderPort
      }));
    }
    {
      ({ httpServerMessageQueue: httpServerMessageQueue02 } = createHttpServerMessageQueue({
          recipientHost, recipientPort, messageQueueTypeCode, messageQueueArray, userId, senderHost, senderPort
      }));
    }
   
    // Act
    {
      httpServerMessageQueue01.enqueueHttpRequest({ httpRequest: {
        body: 'Hello World',
        headers: {},
        path: "/test",
        method: "POST"
      }});
    }

    // Assert
    const { httpRequestMessage } = await httpServerMessageQueue02.dequeueHttpRequestMessage();
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
    const messageQueueTypeCode = 2;
    let httpServerMessageQueue01 = null;
    let httpServerMessageQueue02 = null;
    const messageQueueArray = []; //shared messages
    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    {
      ({ httpServerMessageQueue: httpServerMessageQueue01 } = createHttpServerMessageQueue({
          recipientHost, recipientPort, userId, messageQueueTypeCode, messageQueueArray, senderHost, senderPort
      }));
    }
    {
      ({ httpServerMessageQueue: httpServerMessageQueue02 } = createHttpServerMessageQueue({
          recipientHost, recipientPort, userId, messageQueueTypeCode, messageQueueArray, senderHost, senderPort
      }));
    }

    // Act
    {
      const { message } = createMessage({ recipientHost, recipientPort, userId, data, senderHost, senderPort, token, metadata, messageStatusCode });
      httpServerMessageQueue01.enqueueHttpResponseMessage({ responseMessage: message });
    }

    // Assert
    const { httpResponseMessage } = await httpServerMessageQueue02.dequeueHttpResponseMessage();
    expect(httpResponseMessage).not.toBeNull();
  });
});
