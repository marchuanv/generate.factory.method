describe("when queuing http messages", function() {

  let userIdentity;
  const secret = 'httpmessagequeue1234';
  const userId = 'httpmessagequeue';

  beforeAll(() => {
    ({ userIdentity } = createUserIdentity({ userId }));
    userIdentity.register({ secret });
  });

  it("it should dequeue http request messages without error", async function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const messageStatusCode = 2;
    const metadata = {
      secret,
      userId
    };
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
    expect(httpRequestMessage.getDecryptedContent()).toEqual(message.getDecryptedContent());
  });

  it("it should dequeue server http request messages without error", async function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const userId = 'joe';
    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { httpServerMessageQueue } = createHttpServerMessageQueue({
        recipientHost, recipientPort, messageQueueTypeCode: 1, userId, senderHost, senderPort
    });
    await httpServerMessageQueue.open();
    const httpRequest = {
      body: 'Hello World',
      headers: {},
      path: "/test",
      method: "POST"
    }

    // Act
    httpServerMessageQueue.enqueueHttpRequest({ httpRequest });

    // Assert
    const { httpRequestMessage } = await httpServerMessageQueue.dequeueHttpRequestMessage();
    await httpServerMessageQueue.close();
    expect(httpRequestMessage).not.toBeNull();
    expect(httpRequestMessage.getDecryptedContent()).toEqual(httpRequest.body);
  });

  it("it should dequeue server http response messages without error", async function() {

    // Arrange
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const senderHost = 'localhost';
    const senderPort = 3000;
    const messageStatusCode = 0;
    const metadata = {};
    const data = 'Hello World';
    const { createHttpServerMessageQueue } = require("../../lib/factory/httpservermessagequeue.factory");
    const { createMessage } = require("../../lib/factory/message.factory");
    const { httpServerMessageQueue } = createHttpServerMessageQueue({
        recipientHost, recipientPort, messageQueueTypeCode: 1, userId, senderHost, senderPort
    });
    await httpServerMessageQueue.open();

    // Act
    const { message } = createMessage({ recipientHost, recipientPort, userId, data, senderHost, senderPort, metadata, messageStatusCode });
    httpServerMessageQueue.enqueueHttpResponseMessage({ message });

    // Assert
    const { httpResponseMessage } = await httpServerMessageQueue.dequeueHttpResponseMessage();
    await httpServerMessageQueue.close();
    expect(httpResponseMessage).not.toBeNull();
    expect(httpResponseMessage.getId()).toEqual(message.getId());
    expect(httpResponseMessage.getDecryptedContent()).toEqual(message.getDecryptedContent());
  });

});
