const utils = require("utils");
function FactoryContainer() {
    utils.createProperty(this, 'keys', () => {
        return OfflineAudioCompletionEvent
    });
   
}
module.exports = { FactoryContainer };