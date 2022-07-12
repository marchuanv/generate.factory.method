describe("when asking the message handler to send and receive request messages", function() {
  
  it("it should succeed without any errors", async function() {
    
   // Arrange
   const userId = 'joe';
   const sender = { host: 'localhost', port: 2000 };
   const expectedRequestData = 'Hello World';
   const expectedResponsetData = 'Hello World From Server';
   const { createMessage } = require('../../lib/factory/message.factory');
   const { createMessageHandler } = require('../../lib/factory/messagehandler.factory');
   const { messageHandler } = createMessageHandler({ userId });
   let _requestMessage = null;

   messageHandler.receive({ callback: async ({ requestMessage }) => {
     const { message } = createMessage({ userId, data: expectedResponsetData, metadata: { sender }, messageStatusCode: 200 });
     await messageHandler.respond({ responseMessage: message });
     expect(requestMessage).not.toBeNull();
     _requestMessage = requestMessage;
   }});

   // Act
   const { message } = createMessage({ userId, data: expectedRequestData, metadata: { sender, method: 'POST' }, messageStatusCode: 2 });
   const { httpResponseMessage } = await messageHandler.send({ requestMessage: message });

   //Assert
   expect(_requestMessage).not.toBeNull();
   const data = _requestMessage.getContent();
   const { host, port } = _requestMessage.getSenderAddress();
   expect(host).toEqual('localhost');
   expect(port).toEqual(2000);
   expect(data).toEqual(expectedRequestData);
   expect(httpResponseMessage).not.toBeNull();
   expect(httpResponseMessage.getContent()).toEqual(expectedResponsetData);
  });
  
});
