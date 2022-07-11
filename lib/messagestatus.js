const messageStatus = {
    0: "Success",
    1: "Error",
    2: "Pending",
    3: "Fail",
    4: "Incoming"
};
function MessageStatus({ messageStatusCode }) {
    this.code = Object.keys(messageStatus).findIndex(x => x === messageStatusCode || x === messageStatusCode.toString());
    this.description = messageStatus[this.code] || 'unknown';
}
module.exports = { MessageStatus };
