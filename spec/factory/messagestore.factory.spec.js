const { createMessageStore } = require('C:\\component\\lib\\messagestore.factory.js');
describe('when asking MessageStore to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    
    // Act
    const instance = createMessageStore({  });
    // Assert
    expect(instance).not.toBeNull();
  });
});
