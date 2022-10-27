fdescribe("when initialising a component given a client and server messagebus", () => {

    let clientScopeId = "ClientComponentSpec";
    let serverScopeId = "ServerComponentSpec";
    let createComponent;

    beforeAll(() => {
      ({ createComponent } = require('../../lib/factory/generated/component/component.factory.js'));
    });

    it("it should provide the capability for sending and receiving messages.", (done) => {
    
        // Arrange
        let clientComponent;
        let serverComponent;
        {
          const { component } = createComponent({ contextName: serverScopeId, packageJson: {
            userId: 'componenttest',
            senderHost: 'localhost', senderPort: 2000,
            recipientHost: 'localhost', recipientPort: 3000,
            timeout: 15000,
            isServerComponent: true
          }});
          serverComponent = component;
        }
        {
          const { component } = createComponent({ contextName: clientScopeId, packageJson: {
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
        
        });
        serverComponent.initialise({ secret: 'secret1234' }).then(() => {
          serverComponent.receive({ callback: () => {
            serverComponent.send('Hello From Server');
          }});
        });

        // Assert
        clientComponent.receive({ callback: ({ message }) => {
          expect(message).not.toBeUndefined();
          expect(message).not.toBeNull();
          setTimeout(done,1500);
        }});

    });
});