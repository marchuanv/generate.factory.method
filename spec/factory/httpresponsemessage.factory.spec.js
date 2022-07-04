[FactoryRequireScripts]
describe('when asking HttpResponseMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new HttpResponseMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
