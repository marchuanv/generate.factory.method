const { createComponent } = require('C:\\component\\lib\\factory\\component.factory.js');
describe('when asking the Component factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const specInput = {
    "scopeId": "Test",
    "packageJson": null,
    "clientRequestMessageBus": null,
    "clientResponseMessageBus": null,
    "serverResponseMessageBus": null,
    "serverRequestMessageBus": null
}
    // Act
    const {component} = createComponent(scopeId,packageJson,clientRequestMessageBus,clientResponseMessageBus,serverResponseMessageBus,serverRequestMessageBus);
    // Assert
    expect(component).not.toBeNull();
  });
});
