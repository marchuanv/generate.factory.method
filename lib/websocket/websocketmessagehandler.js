const { WebSocketMessageFactory } = require("./websocketmessagefactory.js");
const { ErrorMessages } = require("../errormessages");
const utils = require("utils");

function WebSocketMessageHandler({ messageFactory, errorMessages, connection  }) {
    this.Id = utils.generateGUID();
}
module.exports = { WebSocketMessageHandler };