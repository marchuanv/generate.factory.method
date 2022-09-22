function Logger() {
    this.constructor();
};
Logger.prototype.log = function({ date, event }) { };
module.exports = { Logger };