const utils = require("utils");

function WebSocketMessageHandler({ messageFactory, errorMessages, connection  }) {
    this.Id = utils.generateGUID();
}
module.exports = { WebSocketMessageHandler };