const { HttpRequestMessage } = require("../../lib/http/httprequestmessage");
const { MessageStatus } = require("../../lib/messagestatus");
const { HttpMessageHandlerFactory } = require("../../lib/http/httpmessagehandlerfactory");
const { HttpMessageFactory } = require('../../lib/http/httpmessagefactory');
const { MessageFactory } = require("../../lib/messagefactory");

describe("when asking the http message handler to send and receive an http request messages", function() {
  it("it should do that without error", async function() {
    
    // Arrange
    const httpMessageHandlerFactory = new HttpMessageHandlerFactory({ hostAddress: { address: 'localhost', port: 3000 }, timeout: 5000 });
    const httpMessageHandler = httpMessageHandlerFactory.createunsecure();
    const messageFactory = new MessageFactory();
    const httpMessageFactory = new HttpMessageFactory({ messageFactory });

    httpMessageHandler.receive({ address: { address: 'localhost', port: 3000 }, callback: ({ httpRequestMessage }) => {
      if (!(httpRequestMessage instanceof HttpRequestMessage)) {
        throw new Error("the 'httpRequestMessage' parameter is null, undefined or not of type: HttpRequestMessage");
      }
      return httpMessageFactory.createHttpResponseMessage({ 
        address: { address: 'localhost', port: 3000 },
        data: 'Hello From Server!',
        headers: {},
        messageStatus: new MessageStatus({ code: 0 })
      });
    }});

    // Act
    const message = await httpMessageHandler.send({ address: { host: 'localhost', port: 3000}, data: 'Hello World!' });

    // Assert
    expect(message).not.toBeNull();
    expect(message.getContent()).toEqual('Hello From Server!')
  });
});
