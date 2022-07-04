[FactoryRequireScripts]
describe('when asking HttpMessageQueue to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new HttpMessageQueueFactory({ name,callback });
    // Assert
    expect(instance).not.toBeNull();
  });
});
