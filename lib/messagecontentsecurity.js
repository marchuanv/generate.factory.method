function MessageContentSecurity({ messageMetadata }) {
    const { createUserSession } = require('./factory/usersession.factory.js');
    let { secret, remotebase64rsapublickey, userid } = messageMetadata;
    const { userSession } = createUserSession({ userId: userid });
    const { userSecurity } = userSession.getUserSecurity();
    if (userSecurity.isRegistered() && secret) {
        userSecurity.authenticate({ secret });
    }
    if (remotebase64rsapublickey && !userIdentity.getRemoteBase64RSAPublicKey()) {
        const base64RSAPublicKey = remotebase64rsapublickey;
        userSecurity.setRemoteBase64RSAPublicKey({ base64RSAPublicKey });
    }
}
module.exports = { MessageContentSecurity };
