const { MessageStatus } = require("../../lib/messagestatus");
const { Message } = require("../../lib/message");

xdescribe("when asking the message handler to send and receive request messages", function() {
  it("it should succeed without any errors", async function() {
    
    // Arrange
    const hostAddress = { host: 'localhost', port: 3000 };
    const sender = { address: 'localhost', port: 3000 };
    const httpMessageHandlerFactory = new HttpMessageHandlerFactory({ hostAddress, timeout: 3000 });
    const messageHandlerFactory = new MessageHandlerFactory({ httpMessageHandlerFactory, hostAddress });
    const messageHandler = messageHandlerFactory.createunsecure();

    messageHandler.receive({ callback: ({ message }) => {
      if (!(message instanceof Message)) {
        throw new Error("the 'message' parameter is null, undefined or not of type: Message");
      }
      const data = 'Hello From Server!';
      const metadata = {};
      return messageFactory.create({ recipientAddress, data, metadata, messageStatus: new MessageStatus({ messageStatusCode: 0 }) });
    }});

    // Act
    const message = await messageHandler.send({ metadata: { sender }, data: 'Hello World!' });

    // Assert
    expect(message).not.toBeNull();
  });
});
