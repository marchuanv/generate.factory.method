const { Encryption } = require("../encryption");
const { MessageFactory } = require("../messagefactory");
const { UserIdentity } = require("../useridentity");
const { HttpConnection } = require("./httpconnection");
const { HttpMessageFactory } = require("./httpmessagefactory");
const { HttpMessageHandler } = require("./httpmessagehandler");
const { HttpRequestQueue } = require("./httprequestqueue");
const { HttpResponseQueue } = require("./httpresponsequeue");
function HttpMessageHandlerFactory({ hostAddress, timeout }) {
    if (!hostAddress) {
        throw new Error("the 'hostAddress' parameter is null or undefined.");
    }
    if (!timeout) {
        throw new Error("the 'timeout' parameter is null or undefined.");
    }
    const httpRequestQueue = new HttpRequestQueue();
    const httpResponseQueue = new HttpResponseQueue();
    const httpConnection = new HttpConnection({ httpRequestQueue, httpResponseQueue, hostAddress, timeout });
    Object.defineProperty(this, 'createsecure', { writable: false, value: ({ userId, secret }) => {
        const userIdentity = new UserIdentity({ userId });
        userIdentity.authenticate({ secret });
        const encryption = new Encryption({ userIdentity });
        const messageFactory = new MessageFactory({ encryption });
        const httpMessageFactory  = new HttpMessageFactory({ messageFactory });
        return new HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue, httpResponseQueue });
    }});
    Object.defineProperty(this, 'createunsecure', { writable: false, value: () => {
        const messageFactory = new MessageFactory();
        const httpMessageFactory  = new HttpMessageFactory({ messageFactory });
        return new HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue, httpResponseQueue });
    }});
};
HttpMessageHandlerFactory.prototype.createsecure = function({ userId, secret }) {};
HttpMessageHandlerFactory.prototype.createunsecure = function() {};
module.exports = { HttpMessageHandlerFactory };