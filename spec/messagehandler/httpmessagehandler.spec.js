const { HttpMessageHandler } = require("../../lib/http/httpmessagehandler");
const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");
const { HttpConnection } = require("../../lib/http/httpconnection");
const { HttpRequestMessage } = require("../../lib/http/httprequestmessage");
const { MessageStatus } = require("../../lib/messagestatus");

describe("when asking the http message handler to send and receive an http request message", function() {
  it("it should do that without error", async function() {
    
    // Arrange
    const messageFactory = new MessageFactory();
    const httpMessageFactory = new HttpMessageFactory({ messageFactory });
    const httpConnection = new HttpConnection({ host: 'localhost', port: 3000 });
    const httpMessageHandler = new HttpMessageHandler({ httpMessageFactory, httpConnection });
    httpMessageHandler.receive({ callback: ({ httpRequestMessage }) => {
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
    const message = await httpMessageHandler.send({ fromHost: 'localhost:3000', data: 'Hello World!' });

    // Assert
    expect(message).not.toBeNull();
  });
});
