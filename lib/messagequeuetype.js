const queueTypes = {
    1: "HttpQueue",
    2: "WebSocketQueue",
    3: "MessageHandlerQueue"
};
function MessageQueueType({ messageQueueTypeCode }) {
    const item = Object.keys(queueTypes).map(key => {
        return {
            code: Number(key),
            name: queueTypes[key],
        };
    }).find(type => type.code === messageQueueTypeCode);
    this.code = item.code;
    this.name = item.name
};
module.exports = { MessageQueueType };
