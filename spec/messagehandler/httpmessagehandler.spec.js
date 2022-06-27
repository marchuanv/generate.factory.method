const { HttpRequestMessage } = require("../../lib/http/httprequestmessage");
const { MessageStatus } = require("../../lib/messagestatus");
const { HttpMessageHandlerFactory } = require("../../lib/http/httpmessagehandlerfactory");

describe("when asking the http message handler to send and receive an http request message", function() {
  it("it should do that without error", async function() {
    
    // Arrange
    const httpMessageHandlerFactory = new HttpMessageHandlerFactory()
    const httpMessageHandler = httpMessageHandlerFactory.createunsecure();

    httpMessageHandler.receive({ host: 'localhost', port: 3000, callback: ({ httpRequestMessage }) => {
      if (!(httpRequestMessage instanceof HttpRequestMessage)) {
        throw new Error("the 'httpRequestMessage' parameter is null, undefined or not of type: HttpRequestMessage");
      }
      return httpMessageFactory.createHttpResponseMessage({ 
        fromHost: 'localhost:4000',
        data: 'Hello From Server!',
        headers: {},
        messageStatus: new MessageStatus({ code: 0 })
      });
    }});

    // Act
    const message = await httpMessageHandler.send({ host: 'localhost', port: 3000, data: 'Hello World!' });

    // Assert
    expect(message).not.toBeNull();
  });
});
