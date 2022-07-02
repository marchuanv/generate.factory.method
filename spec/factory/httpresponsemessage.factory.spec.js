const { HttpResponseMessageFactory } = require('D:\\component\\lib\\http\\httpresponsemessage.factory.js');
[factoryVariableNames]


describe('when asking HttpResponseMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const message = null;
    // Act
    const instance = new HttpResponseMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
