function Subscription({ channelName }) {
    const callbacks = [];    
    Object.defineProperty(this, 'getChannelName', { configurable: false, writable: false, value: () => channelName });
    Object.defineProperty(this, 'receiveData', { configurable: false, writable: false, value: async ({ host, port, data }) => {
        for(const callback of callbacks) {
            await callback({ host, port, data });
        };
    }});
    Object.defineProperty(this, 'onDataReceived', { onfigurable: true, writable: false, value: ({ callback }) => {
        callbacks.push(async ({ host, port, data }) => callback({ host, port, data }));
    }});
}
Subscription.prototype.getChannelName = () => {};
Subscription.prototype.receiveData = ({ from, data }) => { }
Subscription.prototype.onDataReceived = ({ callback }) => { }
module.exports = { Subscription };
