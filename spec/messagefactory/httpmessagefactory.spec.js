const errorMessages = require("../../lib/errormessages");
const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");
const { MessageStatus } = require("../../lib/messagestatus");

const data = 'this is a test';
const fromHost = 'localhost:3000';
const messageFactory = new MessageFactory();
const httpMessageFactory = new HttpMessageFactory({ messageFactory });

describe("when asking for an http request message", function() {
  it("it should instruct the http message factory to create one", async function() {
    const httpRequestMessage = await httpMessageFactory.createHttpRequestMessage({ address, data, headers: { token: '12345' } });
    expect(httpRequestMessage).not.toBeNull();
    const headers = await httpRequestMessage.getHeaders();
    expect(headers).not.toBeNull();
    const content = await httpRequestMessage.getContent();
    expect(content).not.toBeNull();
    const contentType = await httpRequestMessage.getContentType();
    expect(contentType).not.toBeNull();
    const contentLength = await httpRequestMessage.getContentLength();
    expect(contentLength).not.toBeNull();
  });
});

describe("when asking for an http response message", function() {
  it("it should instruct the http message factory to create one", async function() {
    const messageStatus = new MessageStatus({ code: 0 });
    const httpResponseMessage = await httpMessageFactory.createHttpResponseMessage({ address, data, headers: { token: '12345' }, messageStatus });
    expect(httpResponseMessage).not.toBeNull();
    const headers = await httpResponseMessage.getHeaders();
    expect(headers).not.toBeNull();
    const content = await httpResponseMessage.getContent();
    expect(content).not.toBeNull();
    const contentType = await httpResponseMessage.getContentType();
    expect(contentType).not.toBeNull();
    const contentLength = await httpResponseMessage.getContentLength();
    expect(contentLength).not.toBeNull();
  });
});
