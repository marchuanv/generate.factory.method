describe("when queuing http messages", function() {

  const secret = 'httpmessagequeue1234';
  const userId = 'httpmessagequeue';

  beforeAll(() => {
    const { createSharedUserSessions } = require('../../lib/factory/sharedusersessions.factory.js');
    const { sharedUserSessions } = createSharedUserSessions({});
    const { userSecurity } = sharedUserSessions.ensureSession({ userId });
    userSecurity.register({ secret });
    userSecurity.authenticate({ secret });
  });

  it("it should dequeue http request messages without error", async function() {

    // Arrange
    let actualDecryptedText;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const messageStatusCode = 2;
    const metadata = { userId };
    const data = 'Hello World';
    const { createHttpClientMessageQueue } = require("../../lib/factory/httpclientmessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    const { httpClientMessageQueue } = createHttpClientMessageQueue({ messageQueueTypeCode: 1 });
    await httpClientMessageQueue.open();

    // Act
    const { message } = createMessage({ messageStatusCode, Id: null, data, recipientHost, recipientPort, metadata, senderHost, senderPort });
    httpClientMessageQueue.enqueueHttpRequestMessage({ message });

    // Assert
    const { httpRequestMessage } = await httpClientMessageQueue.dequeueHttpRequestMessage();
    await httpClientMessageQueue.close();
    expect(httpRequestMessage).not.toBeNull();
    expect(httpRequestMessage.getId()).toEqual(message.getId());
    {  //variable scoping
      const { text } = httpRequestMessage.getDecryptedContent() || {};
      actualDecryptedText = text;
    }
    const { text } = message.getDecryptedContent() || {};
    expect(actualDecryptedText).toEqual(text);
  });

  it("it should dequeue server http request messages without error", async function() {

    // Arrange
    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { httpServerMessageQueue } = createHttpServerMessageQueue({ messageQueueTypeCode: 1 });
    await httpServerMessageQueue.open();
    const httpRequest = {
      body: 'Hello World',
      headers: {
        recipienthost: 'localhost',
        recipientport: 3000,
        senderhost: 'localhost',
        senderport: 3000,
        userid: userId
      },
      path: "/test",
      method: "POST"
    }

    // Act
    httpServerMessageQueue.enqueueHttpRequest({ httpRequest });

    // Assert
    const { httpRequestMessage } = await httpServerMessageQueue.dequeueHttpRequestMessage();
    await httpServerMessageQueue.close();
    expect(httpRequestMessage).not.toBeNull();
    const { text } = httpRequestMessage.getDecryptedContent();
    expect(text).toEqual(httpRequest.body);
  });

  it("it should dequeue server http response messages without error", async function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const messageStatusCode = 0;
    const metadata = { userId };
    const data = 'Hello World';
    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    const { httpServerMessageQueue } = createHttpServerMessageQueue({ messageQueueTypeCode: 1 });
    await httpServerMessageQueue.open();

    // Act
    const { message } = createMessage({ messageStatusCode, Id: null, data, recipientHost, recipientPort, metadata, senderHost, senderPort });
    httpServerMessageQueue.enqueueHttpResponseMessage({ message });

    // Assert
    const { httpResponseMessage } = await httpServerMessageQueue.dequeueHttpResponseMessage();
    await httpServerMessageQueue.close();
    expect(httpResponseMessage).not.toBeNull();
    expect(httpResponseMessage.getId()).toEqual(message.getId());
    expect(httpResponseMessage.getDecryptedContent()).toEqual(message.getDecryptedContent());
  });

});
