const { createContentType } = require('C:\\component\\lib\\factory\\contenttype.factory.js');
describe('when asking the ContentType factory to create an instance of ContentType', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "name": null,
    "factoryContainerBindingName": null
};

    // Act
    const {contentType} = createContentType(testInputArgs);

    // Assert
    expect(contentType).not.toBeNull();

  });
});
