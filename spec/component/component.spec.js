describe("when initialising a component given a client and server messagebus", function() {

  let token = null;
  let clientScopeId = "clientcomponenttest";
  let serverScopeId = "servercomponenttest";

  beforeAll(() => {
    
  });

 it("it should provide the capability for sending and receiving messages.", function(done) {
  
  // Arrange
  const { createComponent } = require('../../lib/factory/component.factory.js');

  // Act
  {
    // Server Component
    const { component } = createComponent({ scopeId: clientScopeId, packageJson: {
      userId: 'componenttest',
      senderHost: 'localhost', senderPort: 3000,
      recipientHost: 'localhost', recipientPort: 2000,
      timeout: 15000,
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
    const { component } = createComponent({ scopeId: serverScopeId, packageJson: {
      userId: 'componenttest',
      senderHost: 'localhost', senderPort: 2000,
      recipientHost: 'localhost', recipientPort: 3000,
      timeout: 15000,
      isServerComponent: false
    }});
    component.initialise({ secret: 'secret1234' }).then(() => {
      component.send({ object: { text: 'Hello From Client' } });
      component.receive({ callback: ({ message }) => {
        setTimeout(done,1500);
      }});
    });
  }
  // Assert
 });
});