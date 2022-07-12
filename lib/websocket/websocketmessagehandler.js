const utils = require("utils");
function WebSocketMessageHandler({ websocketMessageQueue }) {
    this.Id = utils.generateGUID();
}
module.exports = { WebSocketMessageHandler };