const { ContentFactory } = require('C:\\component\\lib\\content.factory.js'); 

describe('when asking Content to create an instance', function() {
  it("it should succeed without any errors", function() {
    
    // Arrange
    const { data,metadata,encryption } = [];
    // Act
    const instance = new ContentFactory({ data,metadata,encryption });
    // Assert
    expect(instance).not.toBeNull();
  });
});
