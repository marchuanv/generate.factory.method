const getProperties = ({ object }) => {
    const properties = [];
    for(const key of Object.getOwnPropertyNames(object)) {
        const propertyName = key.toLowerCase();
        const propertyValue = object[key];
        properties.push({ propertyName, propertyValue });
    }
    return properties;
}
function MessageMetadata({ metadata, senderAddress, recipientAddress }) {
    for(const property of getProperties({ object: metadata })) {
        const existingProperty = getProperties({ object: this }).find(p => p.propertyName === property.propertyName);
        if (!existingProperty) {
            Object.defineProperty(this, property.propertyName, { configurable: false, get: () => {
                return property.propertyValue;
            }});
        }
    }
    for(const property of getProperties({ object: senderAddress })) {
        const existingProperty = getProperties({ object: this }).find(p => p.propertyName === property.propertyName);
        if (!existingProperty) {
            Object.defineProperty(this, property.propertyName, { configurable: false, get: () => {
                return property.propertyValue;
            }});
        }
    }
    for(const property of getProperties({ object: recipientAddress })) {
        const existingProperty = getProperties({ object: this }).find(p => p.propertyName === property.propertyName);
        if (!existingProperty) {
            Object.defineProperty(this, property.propertyName, { configurable: false, get: () => {
                return property.propertyValue;
            }});
        }
    }
}
module.exports = { MessageMetadata };
