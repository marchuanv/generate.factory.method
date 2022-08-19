const utils = require("utils");
const { createUserSecurity } = require("../lib/factory/usersecurity.factory");

describe("when encrypting data given a public key", function() {
    
    let userSecurity;
    let token = null;
    const userId = 'encryptiontest';
    const scopeId = 'usersecuritytest';

    beforeAll(() => {
        const secret = 'encryptiontest1234';
        ({ userSecurity } = createUserSecurity({ scopeId, userId }));
        userSecurity.register({ secret });
        userSecurity.authenticate({ secret });
        ({ token } = userSecurity.authenticate({ secret }));
    });
   
    it("it should encrypt and encode into a base64 string", function() {
        // Arrange

        // Pre-Condition
        expect(token).not.toBeNull();
        expect(token).not.toBeUndefined();

        // Act
        const encryptedData = userSecurity.encryptObjectToJSON({ object: { message: 'test' } });

        // Assert
        expect(utils.isBase64String(encryptedData)).toBeTruthy();
    });

    it("it should decrypt and decode from a base64 string", function() {
        // Arrange

        // Pre-Condition
        expect(token).not.toBeNull();
        expect(token).not.toBeUndefined();

        // Act
        const encryptedJsonStr = userSecurity.encryptObjectToJSON({ object: { message: 'test' } });
    
        // Assert
        const decryptedData = userSecurity.decryptJSONToObject({ encryptedJsonStr });
        expect(utils.getJSONString(decryptedData)).toEqual("{\n    \"message\": \"test\"\n}");
    });
    
});
