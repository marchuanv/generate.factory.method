const { createContentType } = require('D:\\component\\lib\\factory\\contenttype.factory.js');
describe('when asking the ContentType factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const {name} = require('D:\\component\\spec\\factory\\contenttype.factory.spec.variables.json');

    // Act
    const {contentType} = createContentType({name});
    // Assert
    expect(contentType).not.toBeNull();
  });
});
