describe("when asking the message handler to send and receive request messages", function() {
  
  const sender = { host: 'localhost', port: 2000 };
  const hostAddress = { host: 'localhost', port: 7000 };
  const userId = 'joe';
  const timeout = 5000;

  beforeAll(async () => {
    const { createMessageHandler } = require('../../lib/factory/messagehandler.factory');
    const { httpConnection, messageHandler } = createMessageHandler({ timeout, userId, hostAddress });
    this.httpConnection = httpConnection;
    this.messageHandler = messageHandler;
    await this.httpConnection.open();
  });

  it("it should succeed without any errors", async function() {
    
    // Arrange
    this.messageHandler.receive({ callback: ({ message }) => {
      expect(message).not.toBeNull();
      const data = 'Hello From Server!';
      const metadata = {};
    
    }});

    // Act
    const message = await this.messageHandler.send({ metadata: { sender }, data: 'Hello World!' });

    // Assert
    expect(message).not.toBeNull();
  });
  
  afterAll(async () => {
    await this.httpConnection.close();
  });

});
