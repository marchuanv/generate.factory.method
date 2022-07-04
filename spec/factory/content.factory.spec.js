const { createUserIdentity } = require('C:\\component\\lib\\useridentity.factory.js');
const { createEncryption } = require('C:\\component\\lib\\encryption.factory.js');
const { createContent } = require('C:\\component\\lib\\content.factory.js');
describe('when asking Content to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userIdentity = createUserIdentity({});
const encryption = createEncryption({});
    // Act
    const instance = createContent({ data,metadata,encryption });
    // Assert
    expect(instance).not.toBeNull();
  });
});
