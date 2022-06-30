const { HttpMessageFactory } = require("../../lib/http/httpmessagefactory");
const { MessageFactory } = require("../../lib/messagefactory");
const { MessageStatus } = require("../../lib/messagestatus");
const { Encryption } = require("../../lib/encryption");
const { UserIdentity } = require("../../lib/useridentity");
const { MessageStore } = require("../../lib/messagestore");

xdescribe("when asking for an http request message", function() {
  it("it should instruct the http message factory to create one", async function() {

    const messageStore = new MessageStore();
    const userIdentity = new UserIdentity({ userId: 'admin' });
    userIdentity.authenticate({ secret: 'admin' });
    if (!userIdentity.isRegistered()){
        userIdentity.register({ secret: 'admin' });
    }
    const encryption = new Encryption({ userIdentity });
    const messageFactory = new MessageFactory({ encryption, messageStore });
    const httpMessageFactory = new HttpMessageFactory({ messageFactory });

    const httpRequestMessage = await httpMessageFactory.createHttpRequestMessage({ data: 'Hello World', headers: { token: '12345' } });
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

xdescribe("when asking for an http response message", function() {
  it("it should instruct the http message factory to create one", async function() {

    const messageStore = new MessageStore();
    const userIdentity = new UserIdentity({ userId: 'admin' });
    userIdentity.authenticate({ secret: 'admin' });
    if (!userIdentity.isRegistered()){
        userIdentity.register({ secret: 'admin' });
    }
    const encryption = new Encryption({ userIdentity });
    const messageFactory = new MessageFactory({ encryption, messageStore });
    const httpMessageFactory = new HttpMessageFactory({ messageFactory });

    const messageStatus = new MessageStatus({ code: 0 });
    const httpResponseMessage = await httpMessageFactory.createHttpResponseMessage({ data: 'Hello World', headers: { token: '12345' }, messageStatus });
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
