const { Encryption } = require("../encryption");
const { MessageFactory } = require("../messagefactory");
const { UserIdentity } = require("../useridentity");
const { HttpConnection } = require("./httpconnection");
const { HttpMessageFactory } = require("./httpmessagefactory");
const { HttpMessageHandler } = require("./httpmessagehandler");
const { HttpMessageQueue } = require("./httpmessagequeue");
function HttpMessageHandlerFactory({ hostAddress, timeout }) {
    if (!hostAddress) {
        throw new Error("the 'hostAddress' parameter is null or undefined.");
    }
    if (!timeout) {
        throw new Error("the 'timeout' parameter is null or undefined.");
    }
    const messageFactory = new MessageFactory();
    const httpMessageFactory  = new HttpMessageFactory({ messageFactory });
    const httpMessageQueue = new HttpMessageQueue({ httpMessageFactory });
    const httpConnection = new HttpConnection({ httpMessageQueue, hostAddress, timeout });
    Object.defineProperty(this, 'createsecure', { writable: false, value: ({ userId, secret }) => {
        const userIdentity = new UserIdentity({ userId });
        userIdentity.authenticate({ secret });
        const encryption = new Encryption({ userIdentity });
        const messageFactory = new MessageFactory({ encryption });
        const httpMessageFactory  = new HttpMessageFactory({ messageFactory });
        return new HttpMessageHandler({ httpMessageFactory, httpConnection, httpMessageQueue });
    }});
    Object.defineProperty(this, 'createunsecure', { writable: false, value: () => {
        return new HttpMessageHandler({ httpMessageFactory, httpConnection, httpMessageQueue });
    }});
};
HttpMessageHandlerFactory.prototype.createsecure = function({ userId, secret }) {};
HttpMessageHandlerFactory.prototype.createunsecure = function() {};
module.exports = { HttpMessageHandlerFactory };