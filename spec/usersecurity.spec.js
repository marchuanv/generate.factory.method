const utils = require("utils");
describe("when encrypting data given a public key", function() {
    
    let userSecurity;
    let token = null;
    const userId = 'encryptiontest';
    const factoryContainerBindingName = 'UserSecuritySpec';
    let createUserSecurity = null;

    beforeAll(() => {
        ({ createUserSecurity } = require("../lib/factory/generated/usersecurity/usersecurity.factory"));
        const secret = 'encryptiontest1234';
        ({ userSecurity } = createUserSecurity({ factoryContainerBindingName, userId }));
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
