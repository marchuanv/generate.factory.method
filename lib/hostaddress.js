function HostAddress({ host, hostPort }) {
    Object.defineProperty(this, 'host', { configurable: false, writable: false, value: host });
    Object.defineProperty(this, 'port', { configurable: false, writable: false, value: hostPort });
}
module.exports = { HostAddress };
