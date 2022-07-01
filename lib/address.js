function Address({address, host, port }) {
    Object.defineProperty(this, 'host', { configurable: false, writable: false, value: host });
    Object.defineProperty(this, 'address', { configurable: false, writable: false, value: address });
    Object.defineProperty(this, 'port', { configurable: false, writable: false, value: port });
}
module.exports = { Address };
