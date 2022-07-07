
const { MessageConverter } = require('C:\\component\\lib\\messageconverter.js');
function createMessageConverter({}) {
    
    const messageConverter = new MessageConverter({});
    console.log('MessageConverterFactory: --> created MessageConverter');
    return {messageConverter};
}
module.exports = { createMessageConverter };
