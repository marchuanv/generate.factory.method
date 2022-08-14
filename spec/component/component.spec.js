fdescribe("when initialising a component given a userid and secret", function() {

  let token = null;

  beforeAll(() => {
    
  });

 it("it should creste a secure messagebus", function(done) {
  
  // Arrange
  // Act
  {
    // Server Component
    const { createComponent } = require('../../lib/factory/component.factory.js');
    const { component } = createComponent({ packageJson: {
      userId: 'componenttest',
      recipientAddress: { recipientHost: 'localhost', recipientPort: 3000 },
      senderAddress: { senderHost: 'localhost', senderPort: 2000 },
      isServerComponent: true
    }});
    component.initialise({ secret: 'secret1234' }).then(() => {
      component.receive({ callback: ({ message }) => {
        component.send({ object: { text: 'Hello From Server' } });
      }});
    });
  }
  {
    // Client Component
    const { createComponent } = require('../../lib/factory/component.factory.js');
    const { component } = createComponent({ packageJson: {
      userId: 'componenttest',
      senderAddress: { senderHost: 'localhost', senderPort: 3000 },
      recipientAddress: { recipientHost: 'localhost', recipientPort: 2000 },
      isServerComponent: false
    }});
    component.initialise({ secret: 'secret1234' }).then(() => {
      component.send({ object: { text: 'Hello From Client' } });
      component.receive({ callback: ({ message }) => {
        done();
      }});
    });
  }
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
   