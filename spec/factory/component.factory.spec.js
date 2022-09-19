const { createComponent } = require('C:\\component\\lib\\factory\\component.factory.js');
describe('when asking the Component factory to create an instance of Component', () => {
  it("it should succeed without any errors", () => {

    // Arrange
    const testInputArgs =
      {
    "factoryContainerBindingName": null,
    "packageJson": null,
    "clientRequestMessageBus": null,
    "clientResponseMessageBus": null,
    "serverResponseMessageBus": null,
    "serverRequestMessageBus": null
};

    // Act
    const {component} = createComponent(testInputArgs);

    // Assert
    expect(component).not.toBeNull();

  });
});
