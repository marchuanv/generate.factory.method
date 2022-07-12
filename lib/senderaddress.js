function SenderAddress({ host, port }) {
    Object.defineProperty(this, 'host', { configurable: false, writable: false, value: host });
    Object.defineProperty(this, 'port', { configurable: false, writable: false, value: port });
}
module.exports = { SenderAddress };
