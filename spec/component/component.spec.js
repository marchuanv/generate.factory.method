fdescribe("when initialising a component given a userid and secret", function() {
 it("it should creste a secure messagebus", async function() {
  
    // Arrange
  const { createComponent } = require('../../lib/factory/component.factory.js');
  const { component } = createComponent({ packageJson: {
    userId: 'joe',
    channel: 'componenttest',
    recipientAddress: { recipientHost: 'localhost', recipientPort: 3000 },
    senderAddress: { senderHost: 'localhost', senderPort: 3000 },
    remoteBase64RSAPublicKey: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JR2VNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0R01BRENCaUFLQmdHTldFenp0b3JYcmJoSmxEdTBQaFlvUGxHZXN5bXowR0Z6czFvSEVUQ1lwWnY1TkxEaVpiNzFtNlpKY2RhSlZmSHJ2dTVxNDN6SGdObU84K0lMeE9tdFVLZnJBOHR1azcwSFl0QllCU05tZGVCZGRHSnZQYjVndFRiMksxUCtNY3VuUzVUbmw2U2RBZDFkVUdva1BGeEFwS3JGbkFPaHpWd0dEbUMvZE50QkhBZ01CQUFFPQ0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"
  }});

  await component.initialise({ secret: 'secret1234' });

  // Act
  // Assert
 });
});

xdescribe("when sending data given a component", function() {
 it("it should instruct the messagebus to publish the data in the form of a message", function() {
  // Arrange
  // Act
  // Assert
 });
});

xdescribe("when receiving data given a component", function() {
    it("it should instruct the messagebus to subscribe to a channel listening for messages", function() {
     // Arrange
     // Act
     // Assert
    });
   });
   