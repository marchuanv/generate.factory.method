const { createMessageUserIdentity } = require('C:\\component\\lib\\factory\\messageuseridentity.factory.js');
describe('when asking the MessageUserIdentity factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {metadata,userId,data} = require('C:\\component\\spec\\factory\\messageuseridentity.factory.spec.variables.json');

    // Act
    const {messageUserIdentity} = createMessageUserIdentity({userId,metadata,data});
    // Assert
    expect(messageUserIdentity).not.toBeNull();
  });
});
