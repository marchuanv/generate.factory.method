const getProperties = ({ object }) => {
    const properties = [];
    for(const key of Object.getOwnPropertyNames(object)) {
        const propertyName = key.toLowerCase();
        const propertyValue = object[key];
        properties.push({ propertyName, propertyValue });
    }
    return properties;
}
const { MessageMetadata } = require("./messagemetadata.prototype");
MessageMetadata.prototype.constructor = function() {
    Object.defineProperty(this, 'create', { configurable: false, writable: false, value: ({ name, value }) => {
        const existingProperty = getProperties({ object: this }).find(p => p.propertyName === name);
        if (!existingProperty) {
            Object.defineProperty(this, name, { configurable: false, get: () => {
                if (isNaN(value)) {
                    return value;
                } else {
                    return Number(value);
                }
            }});
        }
    }});
    this.create({ name: 'token', value: token });
    for(const property of getProperties({ object: metadata })) {
       this.create({ name: property.propertyName, value: property.propertyValue });
    }
    for(const property of getProperties({ object: senderAddress })) {
        this.create({ name: property.propertyName, value: property.propertyValue });
    }
    for(const property of getProperties({ object: recipientAddress })) {
        this.create({ name: property.propertyName, value: property.propertyValue });
    }
}
module.exports = { MessageMetadata };
