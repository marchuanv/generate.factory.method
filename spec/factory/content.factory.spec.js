const { createUserIdentity } = require('C:\\component\\lib\\factory\\useridentity.factory.js');
const { createEncryption } = require('C:\\component\\lib\\factory\\encryption.factory.js');
const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
describe('when asking Content to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const userId = ;

const userIdentity = createUserIdentity({userId});
const data = ;

const metadata = ;

const encryption = createEncryption({userIdentity});
    // Act
    const instance = createContent({ data,metadata,encryption });
    // Assert
    expect(instance).not.toBeNull();
  });
});
