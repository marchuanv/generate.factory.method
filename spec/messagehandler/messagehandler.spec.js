const { HttpMessageHandler } = require("../../lib/http/httpmessagehandler");
const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");
const { HttpConnection } = require("../../lib/http/httpconnection");
const { MessageStatus } = require("../../lib/messagestatus");
const { MessageHandler } = require("../../lib/messagehandler");
const { Message } = require("../../lib/message");
const { Content } = require("../../lib/content");
const { HttpRequestQueue } = require("../../lib/http/httprequestqueue");

describe("when asking the http message handler to send and receive an http request message", function() {
  it("it should do that without error", async function() {
    
    // Arrange
    const messageFactory = new MessageFactory();
    const httpMessageFactory = new HttpMessageFactory({ messageFactory });
    const httpRequestQueue = new HttpRequestQueue();
    const httpConnection = new HttpConnection({ httpRequestQueue });
    const httpMessageHandler = new HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue });
    const messageHandler = new MessageHandler({ httpMessageHandler, httpMessageFactory });
    messageHandler.receive({ callback: ({ message }) => {
      if (!(message instanceof Message)) {
        throw new Error("the 'message' parameter is null, undefined or not of type: Message");
      }
      const data = 'Hello From Server!';
      const metadata = {};
      const content = new Content({ data, metadata });
      return messageFactory.create({ fromHost: 'localhost:4000', content, messageStatus: new MessageStatus({ code: 0 }) });
    }});

    // Act
    const message = await messageHandler.send({ data: 'Hello World!' });

    // Assert
    expect(message).not.toBeNull();
  });
});
