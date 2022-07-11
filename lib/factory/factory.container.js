const utils = require("utils");
function FactoryContainer() {
    utils.createProperty(this, 'keys', () => {
        return OfflineAudioCompletionEvent
    });
    utils.createProperty(this, 'add', (reference) => {
        for(const key of Object.keys(reference)) {
            if (key !== 'add' && key !== 'addEvent' && key !== 'addEvent') {
                this[key] = reference[key];
            }
        }
    });
}
module.exports = { FactoryContainer };