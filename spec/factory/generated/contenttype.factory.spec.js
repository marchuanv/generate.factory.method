const { createContentType } = require('C:\\component\\lib\\factory\\generated\\contenttype\\contenttype.factory.js');
describe('when asking the ContentType factory to create an instance of ContentType', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "name": null,
    "factoryContainerBindingName": "factoryspec"
};

    // Act
    const {contentType} = createContentType(testInputArgs);

    // Assert
    expect(contentType).not.toBeNull();

  });
});
