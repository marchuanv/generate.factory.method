const messageStatus = {
    0: "Success",
    200: "Http Success",
    1: "Error",
    2: "Pending",
    3: "Fail",
    4: "Incoming",
    202: "Http Pending",
};
const keys = Object.keys(messageStatus).sort((x,y) => x -y);
let allMessageStatus = [];
function createMessageStatus({ messageStatusCode }) {
    const code = keys.filter(key => key === messageStatusCode || key === messageStatusCode.toString()).reduce((prevKey,key) => { return Number(key); }, -1);
    return { code, description: messageStatus[code] || 'unknown', parent: null };
}
allMessageStatus = allMessageStatus.concat(keys.map(key => createMessageStatus({ messageStatusCode: key })));
allMessageStatus.forEach(ms => ms.parent = allMessageStatus.find(ms2 => ms.description.indexOf(ms2.description) > -1 && ms2.code !== ms.code));
function MessageStatus({ messageStatusCode }) {
    const messageStatus = allMessageStatus.find(ms => ms.code === messageStatusCode || ms.code === messageStatusCode.toString())
    const { code, description, parent } = messageStatus;
    this.code = code;
    this.description = description;
    this.parent = parent ? new MessageStatus({ messageStatusCode: parent.code }) : null;
    Object.defineProperty(this, 'match', { configurable: false, writable: false, value: ({ wildcard }) => {
        const children = allMessageStatus.filter(ms => ms.parent && ms.parent.code === this.code);
        for(const child of children) {
            if (child.description.toLowerCase().indexOf(wildcard) > -1) {
                return child;
            }
        }
        return null;
    }});
    Object.defineProperty(this, 'root', { configurable: false, writable: false, value: () => {
       if (this.parent === null) {
        return this;
       } else {
         let currentP = this.parent ;
         let prevP = null;
         while(currentP) {
            prevP = currentP;
            currentP = currentP.parent;
         }
         return prevP;
       }
    }});
}
MessageStatus.prototype.match = function({ wildcard }) {};
MessageStatus.prototype.root = function() {};
module.exports = { MessageStatus };
