const messageStatus = {
    0: "Success",
    1: "Error",
    2: "Pending",
    3: "Fail",
    4: "Incoming",
    200: "Success"
};
function MessageStatus({ messageStatusCode }) {
    this.code = Object.keys(messageStatus)
                    .filter(key => key === messageStatusCode || key === messageStatusCode.toString())
                    .reduce((prevKey,key) => { 
                        return Number(key);
                    },-1);
    this.description = messageStatus[this.code] || 'unknown';
}
module.exports = { MessageStatus };
