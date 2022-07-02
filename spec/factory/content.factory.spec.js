const { ContentFactory } = require('D:\\component\\lib\\content.factory.js');
[factoryVariableNames]


describe('when asking Content to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    [factoryVariableNames]

    
    const data = null;
const metadata = null;
const encryption = null;
    // Act
    const instance = new ContentFactory({ data,metadata,encryption });
    // Assert
    expect(instance).not.toBeNull();
  });
});
