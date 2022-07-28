function MessageMetadata({ metadata }) {
    for(const key of Object.getOwnPropertyNames(metadata)) {
        const propertyName = key.toLowerCase();
        Object.defineProperty(this, propertyName, { configurable: false, get: () => {
            const propertyValue = metadata[key];
            return propertyValue;
        }});
    }
}
module.exports = { MessageMetadata };
