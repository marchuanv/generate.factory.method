
describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    const recipientAddress = { address: 'localhost', port: 3000 };
    const hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
    beforeAll(async () => {
        // const userIdentity = factory.get(UserIdentity, { userId: 'admin' });
        // userIdentity.authenticate({ secret: 'admin' });
        // if (!userIdentity.isRegistered()){
        //     userIdentity.register({ secret: 'admin' });
        // }
        this.factory = new Factory();
        const timeout = 3000;
        this.factory.httpconnection.hostAddress = hostAddress;
        this.factory.httpconnection.timeout = timeout;
        await this.factory.httpconnection.open();
    });
    it("it should return the server host address", () => {
     
        // Arrange
        expect(this.factory.httpconnection.isOpen()).toBeTruthy();

        // Act
        const address = factory.httpconnection.getServerAddress();
   
        // Assert
        expect(address.address).toEqual('127.0.0.1');
    });

    it("it should have a queued request and response", async () => {
     
        // Arrange
        expect(this.factory.httpconnection.isOpen()).toBeTruthy();
        this.factory.httpmessagequeue.dequeueRequestMessage().then(({ httpRequestMessage }) => {
            const data = 'Hello World from Server';
            const headers = {};
            const httpResponseMessage = this.factory.httpmessagefactory.createHttpResponseMessage({ data, headers });
            this.factory.httpmessagequeue.enqueueResponseMessage({ httpResponseMessage });
            console.log('test received response');
        });

        // Act
        await this.factory.httpmessagequeue.enqueueRawRequest({ 
            path: '/',
            headers: { sender: recipientAddress },
            method: 'POST',
            data: 'Hello World'
        });

        // Assert
        const { httpResponseMessage } = await this.factory.httpmessagequeue.dequeueResponseMessage();
        expect(httpResponseMessage.getContent()).toEqual('Hello World from Server');
    });
    
    xit("it should have a closed connection", () => {
        // Arrange
        expect(connection.isOpen()).toBeTruthy();

        // Act
        connection.close();

        // Assert
        expect(connection.isOpen()).toBeFalsy();
    });
});
