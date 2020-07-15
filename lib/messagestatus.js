const messageStatus = {
    "0": "Success",
    "1": "Error",
    "2": "Pending",
    "3": "Fail"
};
function MessageStatus({ code }) {
    const valueIndex = Object.values(messageStatus).findIndex(x => x === code);
    const keyIndex = Object.keys(messageStatus).findIndex(x => x === code || x === code.toString());
    this.code = keyIndex >= 0 ? code: valueIndex > 0 ? Object.keys(messageStatus)[valueIndex] : 'unknown';
    this.description = messageStatus[this.code];
}
module.exports = { MessageStatus };
