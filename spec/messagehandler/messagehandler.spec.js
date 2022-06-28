const { MessageStatus } = require("../../lib/messagestatus");
const { MessageHandler } = require("../../lib/messagehandler");
const { Message } = require("../../lib/message");
const { HttpMessageHandlerFactory } = require("../../lib/http/httpmessagehandlerfactory");
const { MessageHandlerFactory } = require("../../lib/messagehandlerfactory");
const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");

describe("when asking the message handler to send and receive request messages", function() {
  it("it should do that without error", async function() {
    
    // Arrange
    const hostAddress = { host: 'localhost', port: 3000 };
    const recipientAddress = { address: 'localhost', port: 3000 };
    const httpMessageHandlerFactory = new HttpMessageHandlerFactory({ hostAddress, timeout: 3000 });
    const messageHandlerFactory = new MessageHandlerFactory({ httpMessageHandlerFactory, hostAddress });
    const messageHandler = messageHandlerFactory.createunsecure();

    messageHandler.receive({ recipientAddress, callback: ({ message }) => {
      if (!(message instanceof Message)) {
        throw new Error("the 'message' parameter is null, undefined or not of type: Message");
      }
      const data = 'Hello From Server!';
      const metadata = {};
      return messageFactory.create(recipientAddress, data, metadata, messageStatus: new MessageStatus({ code: 0 }) });
    }});

    // Act
    const message = await messageHandler.send({ recipientAddress, data: 'Hello World!' });

    // Assert
    expect(message).not.toBeNull();
  });
});
