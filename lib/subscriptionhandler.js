function SubscriptionHandler({ channelName }) {
    if (!channelName) {
        throw new Error("the 'channelName' parameter is null or undefined.");
    }
    const callbacks = [];    
    Object.defineProperty(this, 'getChannelName', { configurable: false, writable: false, value: () => channelName });
    Object.defineProperty(this, 'receiveData', { configurable: false, writable: false, value: ({ from, data }) => {
        for(const callback of callbacks) {
            callback({ from, data });
        };
    }});
    Object.defineProperty(this, 'onDataReceived', { onfigurable: true, writable: false, value: ({ callback }) => {
        if (!callback || (callback && typeof callback !== 'function')) {
            throw new Error("the 'callback' parameter is null, undefined or not a function");
        }
        callbacks.push(async ({ from, data }) => callback({ from, data }));
    }});
}
SubscriptionHandler.prototype.getChannelName = () => {};
SubscriptionHandler.prototype.receiveData = ({ from, data }) => { }
SubscriptionHandler.prototype.onDataReceived = ({ callback }) => { }
module.exports = { SubscriptionHandler };
