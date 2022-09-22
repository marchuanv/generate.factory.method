function ContentType({ name }) {
    this.constructor({ name });
};
ContentType.prototype.name = "";
ContentType.prototype.description = "";
module.exports = { ContentType };
