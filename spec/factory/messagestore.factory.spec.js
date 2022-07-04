[FactoryRequireScripts]
describe('when asking MessageStore to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    // Act
    const instance = new MessageStoreFactory({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
