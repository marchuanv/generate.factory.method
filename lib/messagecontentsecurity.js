function MessageContentSecurity({ messageMetadata }) {
    const { createUserSession } = require('./factory/usersession.factory.js');
    let { secret, remotebase64rsapublickey, userid } = messageMetadata;
    const { userSession } = createUserSession({ userId: userid });
    const { userSecurity } = userSession.getUserSecurity();
    if (userSecurity.isRegistered()) {
        userSecurity.authenticate({ secret, remotebase64rsapublickey });
    }
}
module.exports = { MessageContentSecurity };
