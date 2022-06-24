function ErrorMessages() {
    const messages = [];
    Object.defineProperty(this, 'add', { writable: false, value: (error) => {
        if (!(error instanceof Error)){
            throw new Error("'error' parameter is undefined, null or not of type: Error");
        }
        console.log('ERROR: ', error);
        messages.push(error);
    }});
    Object.defineProperty(this, 'hasErrors', { writable: false, value: () => {
        return messages.length > 0;
    }});
    Object.defineProperty(this, 'getLatest', { writable: false, value: () => {
        return messages.length > 0 ? messages[0] : '';
    }});
}
ErrorMessages.prototype.add = function(text) { };
ErrorMessages.prototype.hasErrors = function() { };
ErrorMessages.prototype.getLatest = function() { };
module.exports = new ErrorMessages();
