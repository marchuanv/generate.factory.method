xdescribe("when publishing a message", function() {
 it("it should publish to all subscribers", async function() {

    // Arrange
    const userId = 'joe';
    const channel = 'messagebustest';
    const expectedData = 'publishing some data';
    const senderHost = 'localhost';
    const senderPort = 3000;
    const recipientHost = 'localhost';
    const recipientPort = 3000;
    const data = 'publishing some data';
    let subscriberMessages = [];
    let base64rsapublickey = null;

    const { createMessageBus } = require('../../lib/factory/messagebus.factory');
    const remoteBase64RSAPublicKey = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JR2VNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R01BRENCaUFLQmdHTldFenp0b3JYcmJoSmxEdTBQaFlvUGxHZXN5bXowR0Z6czFvSEVUQ1lwWnY1TkxEaVpiNzFtNlpKY2RhSlZmSHJ2dTVxNDN6SGdObU84K0lMeE9tdFVLZnJBOHR1azcwSFl0QllCU05tZGVCZGRHSnZQYjVndFRiMksxUCtNY3VuUzVUbmw2U2RBZDFkVUdva1BGeEFwS3JGbkFPaHpWd0dEbUMvZE50QkhBZ01CQUFFPQ0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t";
    const { messageBus } = createMessageBus({ 
      remoteBase64RSAPublicKey,
      messageQueueTypeCode: 3,
      senderHost, senderPort,
      recipientHost, recipientPort,
      channel, userId
    });
    

    await messageBus.start();
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber01
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber02
    messageBus.subscribe({ callback: ({ message }) => subscriberMessages.push(message) }); //Subscriber03

    // Act
    await messageBus.publish({ data });
    await messageBus.stop();

    // Assert
    expect(subscriberMessages.length).toEqual(3);
    expect(data).toEqual(expectedData);
  })
});
