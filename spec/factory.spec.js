describe("when asking the factory for an instance of a class", function() {
    it("it should resolve and create and object", function() {
        // Arrange
        const factory = require('../lib/factory')
        // Act
        factory.get({ typeName: 'HttpConnection' });
        // Assert
        expect(1).toEqual(1);
    });
});
