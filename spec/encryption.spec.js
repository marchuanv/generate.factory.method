const utils = require("utils");
const { createEncryption } = require("../lib/factory/encryption.factory");

describe("when encrypting data given a public key", function() {
    
    let userIdentity;
    let encryption;
    const secret = 'encryptiontest1234';
    const userId = 'encryptiontest';

    beforeAll(() => {
        ({ userIdentity, encryption } = createEncryption({ userId }));
        userIdentity.register({ secret });
        userIdentity.authenticate({ secret });
        const { base64RSAPublicKey } = userIdentity.getBase64KeyPair();
        userIdentity.setRemoteBase64RSAPublicKey({ base64RSAPublicKey });
    });
   
    it("it should encrypt and encode into a base64 string", function() {
        // Arrange

        // Act
        const encryptedData = encryption.encryptObjectToJSON({ object: { message: 'test' } });

        // Assert
        expect(utils.isBase64String(encryptedData)).toBeTruthy();
    });

    it("it should decrypt and decode from a base64 string", function() {
        // Arrange
    
        // Act
        const encryptedJsonStr = encryption.encryptObjectToJSON({ object: { message: 'test' } });
    
        // Assert
        const decryptedData = encryption.decryptJSONToObject({ encryptedJsonStr });
        expect(utils.getJSONString(decryptedData)).toEqual("{\n    \"message\": \"test\"\n}");
    });
    
});
