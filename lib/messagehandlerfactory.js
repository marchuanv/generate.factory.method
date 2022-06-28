const { HttpMessageHandlerFactory } = require("./http/httpmessagehandlerfactory");
const { MessageFactory } = require('./messagefactory');
const { HttpMessageFactory } = require('./http/httpmessagefactory');
const { MessageHandler } = require('./messagehandler');
function MessageHandlerFactory({ httpMessageHandlerFactory, hostAddress }) {
    if (!(httpMessageHandlerFactory instanceof HttpMessageHandlerFactory)) {
        throw new Error("the 'httpMessageHandlerFactory' parameter is null, undefined or not of type: HttpMessageHandlerFactory");
    }
    if (!hostAddress) {
        throw new Error("the 'hostAddress' parameter is null or undefined.");
    }
    Object.defineProperty(this, 'createunsecure', { writable: false, value: () => {
        const messageFactory = new MessageFactory();
        const httpMessageFactory  = new HttpMessageFactory({ messageFactory });
        const httpMessageHandler = httpMessageHandlerFactory.createunsecure();
        return new MessageHandler({ httpMessageHandler, httpMessageFactory });
    }});
    Object.defineProperty(this, 'createsecure', { writable: false, value: () => {
        throw new Error('implement secure ');
        const httpMessageHandler =  httpMessageHandlerFactory.createsecure();
        return new MessageHandler({ httpMessageHandler, httpMessageFactory });
    }});
};
MessageHandlerFactory.prototype.createunsecure = function () {};
MessageHandlerFactory.prototype.createsecure = function () {};
module.exports = { MessageHandlerFactory };