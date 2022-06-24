const { HttpConnection } = require("../../lib/http/httpconnection");

describe("when opeing an http connection given a hostname and port number", function() {
 it("it should listen for incoming connections", function() {
  
    // Arrange
  const connection = new HttpConnection();

  // Act
  connection.open({ host: 'localhost', port: 3000 });

  // Assert
  expect(connection.isOpen()).toBeTruthy();
  connection.close();
 });
});

describe("when getting host information from an open http connection", function() {
    it("it should return the server host address", function() {
     
        // Arrange
        const connection = new HttpConnection();
        connection.open({ host: 'localhost', port: 3000 });

        // Act
        const address = connection.getHostInfo();
   
        // Assert
        expect(address).not.toBeNull();
        connection.close();
    });
   });