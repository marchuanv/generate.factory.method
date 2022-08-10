const utils = require("utils");
const { createUserSecurity } = require("../lib/factory/usersecurity.factory");

describe("when encrypting data given a public key", function() {
    
    let userSecurity;
    let encryption;
    const secret = 'encryptiontest1234';
    const userId = 'encryptiontest';

    beforeAll(() => {
        ({ userSecurity } = createUserSecurity({ userId }));
        userSecurity.register({ secret });
        userSecurity.authenticate({ secret });
    });
   
    it("it should encrypt and encode into a base64 string", function() {
        // Arrange

        // Act
        const encryptedData = userSecurity.encryptObjectToJSON({ object: { message: 'test' } });

        // Assert
        expect(utils.isBase64String(encryptedData)).toBeTruthy();
    });

    it("it should decrypt and decode from a base64 string", function() {
        // Arrange
    
        // Act
        const encryptedJsonStr = userSecurity.encryptObjectToJSON({ object: { message: 'test' } });
    
        // Assert
        const decryptedData = userSecurity.decryptJSONToObject({ encryptedJsonStr });
        expect(utils.getJSONString(decryptedData)).toEqual("{\n    \"message\": \"test\"\n}");
    });
    
});
