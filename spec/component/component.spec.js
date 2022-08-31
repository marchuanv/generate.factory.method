fdescribe("when initialising a component given a client and server messagebus", function() {

  let clientScopeId = "clientcomponenttest";
  let serverScopeId = "servercomponenttest";
  const { createComponent } = require('../../lib/factory/component.factory.js');

  beforeAll(() => {
    
  });

 it("it should provide the capability for sending and receiving messages.", function(done) {
  
  // Arrange
  let clientComponent;
  let serverComponent;
  {
    const { component } = createComponent({ scopeId: serverScopeId, packageJson: {
      userId: 'componenttest',
      senderHost: 'localhost', senderPort: 2000,
      recipientHost: 'localhost', recipientPort: 3000,
      timeout: 15000,
      isServerComponent: true
    }});
    serverComponent = component;
  }
  {
    const { component } = createComponent({ scopeId: clientScopeId, packageJson: {
      userId: 'componenttest',
      senderHost: 'localhost', senderPort: 3000,
      recipientHost: 'localhost', recipientPort: 2000,
      timeout: 15000,
      isServerComponent: false
    }});
    clientComponent = component;
  }

  // Act
  clientComponent.initialise({ secret: 'secret1234' }).then(() => {
    clientComponent.send('Hello From Client');
    clientComponent.receive({ callback: () => {
      setTimeout(done,1500);
    }});
  });
  serverComponent.initialise({ secret: 'secret1234' }).then(() => {
    serverComponent.receive({ callback: () => {
      serverComponent.send('Hello From Server');
    }});
  });

  // Assert


 });
});