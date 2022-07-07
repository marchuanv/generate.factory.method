const messageStatus = {
    "0": "Success",
    "1": "Error",
    "2": "Pending",
    "3": "Fail",
    "4": "Incoming"
};
function MessageStatus({ messageStatusCode }) {
    const valueIndex = Object.values(messageStatus).findIndex(x => x === messageStatusCode);
    const keyIndex = Object.keys(messageStatus).findIndex(x => x === messageStatusCode || x === messageStatusCode.toString());
    this.code = keyIndex >= 0 ? messageStatusCode: valueIndex > 0 ? Object.keys(messageStatus)[valueIndex] : 'unknown';
    this.description = messageStatus[this.code];
}
module.exports = { MessageStatus };
