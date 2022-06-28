const { HttpMessageFactory } = require("../lib/http/httpmessagefactory");
const { HttpMessageHandlerFactory } = require("./http/httpmessagehandlerfactory");
const { MessageHandler } = require("./messagehandler");
function MessageHandlerFactory({ httpMessageHandlerFactory, httpMessageFactory }) {
    if (!(httpMessageHandlerFactory instanceof HttpMessageHandlerFactory)) {
        throw new Error("the 'httpMessageHandlerFactory' parameter is null, undefined or not of type: HttpMessageHandlerFactory");
    }
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }
    Object.defineProperty(this, 'create', { writable: false, value: () => {
        return new MessageHandler({ httpMessageHandler, httpMessageFactory });
    }});
};
MessageHandlerFactory.prototype.create = function () {};
module.exports = { MessageHandlerFactory };