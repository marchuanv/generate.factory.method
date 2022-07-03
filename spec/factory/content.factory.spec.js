const { ContentFactory } = require('D:\\component\\lib\\content.factory.js');
const { EncryptionFactory } = require('D:\\component\\lib\\encryption.factory.js');
[factoryVariableNames]
const dataFactory = new undefinedFactory([refArgsVariableNames]);
const metadataFactory = new undefinedFactory([refArgsVariableNames]);
const encryptionFactory = new undefinedFactory([refArgsVariableNames]);
describe('when asking Content to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]
const dataFactory = new undefinedFactory([refArgsVariableNames]);
const metadataFactory = new undefinedFactory([refArgsVariableNames]);
const encryptionFactory = new undefinedFactory([refArgsVariableNames]);
    
    const data = null;
const metadata = null;
const encryption = null;
    // Act
    const instance = new ContentFactory({ data,metadata,encryption });
    // Assert
    expect(instance).not.toBeNull();
  });
});
