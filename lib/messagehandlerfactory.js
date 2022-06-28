const { HttpMessageHandlerFactory } = require("./http/httpmessagehandlerfactory");
function MessageHandlerFactory({ httpMessageHandlerFactory, hostAddress }) {
    if (!(httpMessageHandlerFactory instanceof HttpMessageHandlerFactory)) {
        throw new Error("the 'httpMessageHandlerFactory' parameter is null, undefined or not of type: HttpMessageHandlerFactory");
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
MessageHandlerFactory.prototype.createunsecure = function () {};
MessageHandlerFactory.prototype.createsecure = function () {};
module.exports = { MessageHandlerFactory };