const { MessageStoreFactory } = require('C:\\component\\lib\\messagestore.factory.js'); 
describe('when asking MessageStore to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    
    const {} = [];
    // Act
    const instance = new MessageStoreFactory({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
