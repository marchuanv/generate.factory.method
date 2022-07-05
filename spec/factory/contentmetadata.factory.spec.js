const { createContentMetadata } = require('C:\\component\\lib\\contentmetadata.factory.js');
describe('when asking ContentMetadata to create an instance', function() {
  it("it should succeed without any errors", function() {
    // Arrange
    const metadata = {
    "sender": {
        "host": "localhost",
        "port": 3000
    }
};

const data = 'Hello World';

    // Act
    const instance = createContentMetadata({ metadata,data });
    // Assert
    expect(instance).not.toBeNull();
  });
});
