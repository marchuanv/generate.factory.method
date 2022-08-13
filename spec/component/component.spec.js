fdescribe("when initialising a component given a userid and secret", function() {

  let token = null;

  beforeAll(() => {
    
  });

 it("it should creste a secure messagebus", async function() {
  
    // Arrange
    {
      // Server Component
      const { createComponent } = require('../../lib/factory/component.factory.js');
      const { component } = createComponent({ packageJson: {
        userId: 'componenttest',
        recipientAddress: { recipientHost: 'localhost', recipientPort: 3000 },
        senderAddress: { senderHost: 'localhost', senderPort: 2000 },
        isServerComponent: true
      }});
      await component.initialise({ secret: 'secret1234' });
    }
    {
      // Client Component
      const { createComponent } = require('../../lib/factory/component.factory.js');
      const { component } = createComponent({ packageJson: {
        userId: 'componenttest',
        recipientAddress: { recipientHost: 'localhost', recipientPort: 2000 },
        senderAddress: { senderHost: 'localhost', senderPort: 3000 },
        isServerComponent: false
      }});
      await component.initialise({ secret: 'secret1234' });
    }

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
   