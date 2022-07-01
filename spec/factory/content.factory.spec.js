const { ContentFactory } = require('C:\\component\\lib\\content.factory.js');
const { EncryptionFactory } = require('C:\\component\\lib\\encryption.factory.js');
describe('when asking Content to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const encryptionFactory = new EncryptionFactory();
    const encryption = encryptionFactory.create();
    const data = null;
const metadata = null;
    // Act
    const instance = new ContentFactory({ data,metadata,encryption });
    // Assert
    expect(instance).not.toBeNull();
  });
});
