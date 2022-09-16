const { createContentType } = require('C:\\component\\lib\\factory\\contenttype.factory.js');
describe('when asking the ContentType factory to create an instance', function() {
  it("it should succeed without any errors", function() {

    // Arrange
    const testInputArgs =
      {
    "scopeId": "test",
    "name": null
}

    // Act
    const {contentType} = createContentType(testInputArgs);
    // Assert
    expect(contentType).not.toBeNull();
  });
});
