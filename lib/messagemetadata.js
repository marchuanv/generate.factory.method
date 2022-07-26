function MessageMetadata({ metadata }) {
    for(const key of Object.keys(metadata)) {
        const propertyName = key.toLowerCase();
        Object.defineProperty(this, propertyName, { configurable: false, writable: false, value: metadata[key] });
    }
}
module.exports = { MessageMetadata };
