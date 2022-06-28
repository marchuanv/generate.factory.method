const { HttpMessageFactory } = require("../lib/http/httpmessagefactory");
const { HttpMessageHandlerFactory } = require("./http/httpmessagehandlerfactory");
const { MessageHandler } = require("./messagehandler");
function MessageHandlerFactory({ httpMessageHandlerFactory, httpMessageFactory, hostAddress }) {
    if (!(httpMessageHandlerFactory instanceof HttpMessageHandlerFactory)) {
        throw new Error("the 'httpMessageHandlerFactory' parameter is null, undefined or not of type: HttpMessageHandlerFactory");
    }
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }
    if (!hostAddress) {
        throw new Error("the 'hostAddress' parameter is null or undefined.");
    }
    Object.defineProperty(this, 'createunsecure', { writable: false, value: () => {
        return httpMessageHandlerFactory.createunsecure();
    }});
    Object.defineProperty(this, 'createsecure', { writable: false, value: () => {
        return httpMessageHandlerFactory.createsecure();
    }});
};
MessageHandlerFactory.prototype.create = function () {};
module.exports = { MessageHandlerFactory };