const { HttpResponseMessageFactory } = require('C:\\component\\lib\\http\\httpresponsemessage.factory.js'); 
describe('when asking HttpResponseMessage to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const message = new Message();
    const {} = [];
    // Act
    const instance = new HttpResponseMessageFactory({ message });
    // Assert
    expect(instance).not.toBeNull();
  });
});
