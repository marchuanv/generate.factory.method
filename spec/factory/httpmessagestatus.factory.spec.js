const { createMessageStatus } = require('C:\\component\\lib\\factory\\messagestatus.factory.js');
const { createHttpMessageStatus } = require('C:\\component\\lib\\factory\\httpmessagestatus.factory.js');
describe('when asking HttpMessageStatus to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {code} = require('C:\\component\\spec\\factory\\httpmessagestatus.factory.spec.variables.json');

const messageStatus = createMessageStatus({code});
    // Act
    const instance = createHttpMessageStatus({ messageStatus });
    // Assert
    expect(instance).not.toBeNull();
  });
});
