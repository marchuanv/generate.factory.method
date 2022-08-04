function MessageContentSecurity({ messageMetadata }) {
    const { createUserSession } = require('./factory/usersession.factory.js');
    let { secret, remotebase64rsapublickey, userid } = messageMetadata;
    const { userSession } = createUserSession({ userId: userid });
    const { userSecurity } = userSession.getUserSecurity();
    if (secret && remotebase64rsapublickey) {
        userSecurity.authenticate({ secret, remoteBase64RSAPublickey: remotebase64rsapublickey });
    }
}
module.exports = { MessageContentSecurity };
