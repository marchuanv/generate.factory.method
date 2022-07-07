const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
describe('when asking the Content factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,data,metadata} = require('C:\\component\\spec\\factory\\content.factory.spec.variables.json');

const userIdentity = createUserIdentity({userId});
const encryption = createEncryption({userIdentity});
    // Act
    const instance = createContent({ encryption,data,metadata });
    // Assert
    expect(instance).not.toBeNull();
  });
});
