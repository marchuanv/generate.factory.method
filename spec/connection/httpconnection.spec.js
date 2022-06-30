const { HttpConnection } = require("../../lib/http/httpconnection");
const { UserIdentity } = require("../../lib/useridentity");
const factory = require('../../lib/factory')

describe("when opening an http connection and sending and http request given a hostname and port number", function() {
    
    let connection;
    let recipientAddress;

    beforeAll(async () => {
        const userIdentity = factory.get(UserIdentity, { userId: 'admin' });
        userIdentity.authenticate({ secret: 'admin' });
        if (!userIdentity.isRegistered()){
            userIdentity.register({ secret: 'admin' });
        }
        recipientAddress = { address: 'localhost', port: 3000 };
        const hostAddress = { address: 'localhost', family: 'IPv4', port: 3000 };
        connection =  factory.get(HttpConnection, { hostAddress, timeout: 10000 });
        await connection.open();
    });
    
    it("it should return the server host address", () => {
     
        // Arrange
        expect(connection.isOpen()).toBeTruthy();

        // Act
        const address = connection.getServerAddress();
   
        // Assert
        expect(address.address).toEqual('127.0.0.1');
    });

    it("it should have a queued request and response", async () => {
     
        // Arrange
        expect(connection.isOpen()).toBeTruthy();
        httpMessageQueue.dequeueRequestMessage().then(({ httpRequestMessage }) => {
            const data = 'Hello World from Server';
            const headers = {};
            const httpResponseMessage = httpMessageFactory.createHttpResponseMessage({ data, headers });
            httpMessageQueue.enqueueResponseMessage({ httpResponseMessage });
            console.log('test received response');
        });

        // Act
        await httpMessageQueue.enqueueRawRequest({ 
            path: '/',
            headers: { sender: recipientAddress },
            method: 'POST',
            data: 'Hello World'
        });

        // Assert
        const { httpResponseMessage } = await httpMessageQueue.dequeueResponseMessage();
        expect(httpResponseMessage.getContent()).toEqual('Hello World from Server');
    });
    
    it("it should have a closed connection", () => {
        // Arrange
        expect(connection.isOpen()).toBeTruthy();

        // Act
        connection.close();

        // Assert
        expect(connection.isOpen()).toBeFalsy();
    });
});
