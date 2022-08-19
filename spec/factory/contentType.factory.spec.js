const { createContentType } = require('C:\\component\\lib\\factory\\contentType.factory.js');
describe('when asking the ContentType factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {scopeId,name} = require('C:\\component\\spec\\factory\\contentType.factory.spec.variables.json');

    // Act
    const {contentType} = createContentType({scopeId,name});
    // Assert
    expect(contentType).not.toBeNull();
  });
});
