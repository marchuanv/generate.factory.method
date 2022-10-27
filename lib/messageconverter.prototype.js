function MessageConverter({ contextName }) {
    this.constructor({ contextName });
};
MessageConverter.prototype.convertMessageToHttpRequestMessage = function({ message }) {};
MessageConverter.prototype.convertMessageToHttpResponseMessage = function({ message }) {};
MessageConverter.prototype.convertHttpRequestMessageToMessage = function({ httpRequestMessage }) {};
MessageConverter.prototype.convertHttpResponseMessageToMessage = function({ httpResponseMessage }) {};
module.exports = { MessageConverter };
