const utils = require("utils");

function MessageConverter() {
    utils.createProperty(this,'convertToMessage',({ httpRequestMessage }) => {
        
    });
}
MessageConverter.prototype.convertToMessage = function({ httpRequestMessage }) {};
module.exports = { MessageConverter };
