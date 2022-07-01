const utils = require("utils");
function WebSocketMessageHandler({ websocketConnection, websocketMessageQueue  }) {
    this.Id = utils.generateGUID();
}
module.exports = { WebSocketMessageHandler };