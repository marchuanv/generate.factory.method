const { MessageStore } = require("../messagestore");
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
    Object.defineProperty(this, 'create', { writable: false, value: ({ userId, secret }) => {
        const userIdentity = new UserIdentity({ userId });
        userIdentity.authenticate({ secret });
        const encryption = new Encryption({ userIdentity });
        const messageStore = new MessageStore();
        const messageFactory = new MessageFactory({ encryption, messageStore });
        const httpMessageFactory  = new HttpMessageFactory({ messageFactory });
        const httpMessageQueue = new HttpMessageQueue({ httpMessageFactory });
        const httpConnection = new HttpConnection({ httpMessageQueue, hostAddress, timeout });
        return { 
            httpMessageHandler: new HttpMessageHandler({ httpMessageFactory, httpConnection, httpMessageQueue }),
            httpMessageFactory
        };
    }});
};
HttpMessageHandlerFactory.prototype.create = function({ userId, secret }) {};
module.exports = { HttpMessageHandlerFactory };