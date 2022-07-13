function SenderAddress({ senderHost, senderPort }) {
    Object.defineProperty(this, 'host', { configurable: false, writable: false, value: senderHost });
    Object.defineProperty(this, 'port', { configurable: false, writable: false, value: senderPort });
}
module.exports = { SenderAddress };
