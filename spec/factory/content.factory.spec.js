const { ContentFactory } = require('C:\\component\\lib\\content.factory.js');
[factoryVariableNames]
const encryptionFactory = new EncryptionFactory([refArgsVariableNames]);
const { EncryptionFactory } = require('C:\\component\\lib\\encryption.factory.js');
describe('when asking Content to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const encryptionFactory = new EncryptionFactory([refArgsVariableNames]);
    const encryption = encryptionFactory.create([nonRefArgsVariableNames]);
    const data = null;
const metadata = null;
    // Act
    const instance = new ContentFactory({ data,metadata,encryption });
    // Assert
    expect(instance).not.toBeNull();
  });
});
