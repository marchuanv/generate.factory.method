const { Encryption } = require("../lib/encryption");
const { UserIdentity } = require("../lib/useridentity");
const utils = require("utils");

xdescribe("when encrypting data given a public key", function() {
    
    beforeAll(() => {
        const userIdentity = new UserIdentity({ userId: 'joe' });
        if (!userIdentity.isRegistered()){
            userIdentity.register({ secret: 'secret1234' });
        }
        const base64RSAPublicKey = utils.stringToBase64('-----BEGIN PUBLIC KEY-----\r\nMIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGNWEzztorXrbhJlDu0PhYoPlGesymz0GFzs1oHETCYpZv5NLDiZb71m6ZJcdaJVfHrvu5q43zHgNmO8+ILxOmtUKfrA8tuk70HYtBYBSNmdeBddGJvPb5gtTb2K1P+McunS5Tnl6SdAd1dUGokPFxApKrFnAOhzVwGDmC/dNtBHAgMBAAE=\r\n-----END PUBLIC KEY-----');
        const encryption = new Encryption({ userIdentity });
        encryption.setRemoteRSAPublicKey({ base64RSAPublicKey });
    });
   
    it("it should encrypt and encode into a base64 string", function() {
        // Arrange

        // Act
        userIdentity.authenticate({ secret });
        const encryptedData = encryption.encryptObjectToJSON({ object: { message: 'test' } });

        // Assert
        expect(utils.isBase64String(encryptedData)).toBeTruthy();
    });

    it("it should decrypt and decode from a base64 string", function() {
        // Arrange
        const privateKey = '-----BEGIN RSA PRIVATE KEY-----\r\nMIICWwIBAAKBgGNWEzztorXrbhJlDu0PhYoPlGesymz0GFzs1oHETCYpZv5NLDiZb71m6ZJcdaJVfHrvu5q43zHgNmO8+ILxOmtUKfrA8tuk70HYtBYBSNmdeBddGJvPb5gtTb2K1P+McunS5Tnl6SdAd1dUGokPFxApKrFnAOhzVwGDmC/dNtBHAgMBAAECgYAv8BsKnTeXiU0uTVy9pG7yaIBa4/UwTT/woE8Igr2o8PQGJyH/EnTtN1viyQHv3EddYJHtoef8PtKgoVJghp+FDpN+mdhtNDj4sWNdwoFX1HvIQt1wrIQas63iSPZx9Q7KCUn5GWqSDBWWcQOn1zRWZzLTJ9mFeTHExKaZuSTRYQJBALkFYdOAOkT8I+apKZTm0SKMjjApCM+Mlk+gKkm33Zw3LwmzOuggrhx3/v6TEEkSg8oc/+HMreaK93dla+4GtPcCQQCJcbockqa2OdaGr9QZ0+0O0rqNzaePP2DUocQOcgK00qXkzheq+PRhQBZml17In2mgQn1xpIC44o7bOXj5gPsxAkAJ+5BbqP972V7WgyoLLqj6BDtnvc8L47n4cdvWPmVmmFOhYlo7TAgY4SCQ+75VMvqJXScxN6nqVnUjrAU2woXhAkAU7qIWiesj44kdeBfIWzNGR6erwv9a3J8lowFV5d0tpssnHpASNNobGYSP2UvRKB4RDy9FqHUGM1LoZkdbUF5xAkEApKmzG2w6BEcgNsgPvYQUQ9gUrcAm4ZG9pOIOEn9AAT6pM2r+RKpg7hSoU6jgMM/OhFFbuiHnmK/zTtMw6YwFOw==\r\n-----END RSA PRIVATE KEY-----';
    
        // Act
        const encryptedData = encryption.encryptObjectToJSON({ object: { message: 'test' } });
    
        // Assert
        const decryptedData = utils.decryptFromBase64Str(encryptedData, privateKey, secret);
        expect(decryptedData).toEqual("{\n    \"message\": \"test\"\n}");
    });
    
});
