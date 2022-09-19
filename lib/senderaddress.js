const { SenderAddress } = require("./senderaddress.prototype");
SenderAddress.prototype.constructor = function() {
    Object.defineProperty(this, 'senderHost', { configurable: false, writable: false, value: senderHost });
    Object.defineProperty(this, 'senderPort', { configurable: false, writable: false, value: senderPort });
}
module.exports = { SenderAddress };
