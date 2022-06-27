const { Message } = require("../message");
const utils = require("utils");
function HttpMessageFactoryHandler() {
    Object.defineProperty(this, 'create', { writable: false, value: ({ message }) => {
        return message.getId();
    }});
};
HttpMessageFactoryHandler.prototype.getId = function() {};
HttpMessageFactoryHandler.prototype.getHeaders = function() {};
module.exports = { HttpMessageFactoryHandler };