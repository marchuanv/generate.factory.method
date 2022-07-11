const utils = require("utils");
function FactoryContainer() {
    utils.createProperty(this, 'add', (reference) => {
        if (reference instanceof FactoryContainer) {
            for(const propName in reference) {
                utils.createProperty(this, propName, reference[propName]);
            }
        } else {
            utils.createProperty(this, propName, reference);
        }
    });
}
module.exports = { FactoryContainer };