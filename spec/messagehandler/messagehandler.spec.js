const { HttpMessageHandler } = require("../../lib/http/httpmessagehandler");
const { ErrorMessages } = require("../../lib/errormessages");
const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");
const { HttpConnection } = require("../../lib/http/httpconnection");
const { MessageStatus } = require("../../lib/messagestatus");
const { MessageHandler } = require("../../lib/messagehandler");
const { Message } = require("../../lib/message");
const { Content } = require("../../lib/content");
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
describe("when asking the http message handler to send and receive an http request message", function() {
  it("it should do that without error", async function() {
    
    // Arrange
    const errorMessages = new ErrorMessages();
    const messageFactory = new MessageFactory({ errorMessages });
    const httpMessageFactory = new HttpMessageFactory({ messageFactory, errorMessages });
    const httpConnection = new HttpConnection({ host: 'localhost', port: 3000, errorMessages });
    const httpMessageHandler = new HttpMessageHandler({ httpMessageFactory, httpConnection, errorMessages });
    const messageHandler = new MessageHandler({ httpMessageHandler, httpMessageFactory, errorMessages });
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
