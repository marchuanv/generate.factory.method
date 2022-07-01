const { HttpResponseMessageFactoryFactory } = require('C:\\component\\lib\\http\\httpresponsemessage.factory.js'); 

describe('when asking HttpResponseMessageFactory factory to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { message } = [];
    // Act
    const instance = new HttpResponseMessageFactoryFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
