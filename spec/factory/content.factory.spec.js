const { createContent } = require('C:\\component\\lib\\factory\\content.factory.js');
describe('when asking the Content factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {userId,data,metadata} = require('C:\\component\\spec\\factory\\content.factory.spec.variables.json');

    // Act
    const instance = createContent(userId,data,metadata);
    // Assert
    expect(instance).not.toBeNull();
  });
});
