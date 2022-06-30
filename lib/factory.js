const factoryConfig = require(factoryConfigPath);
Object.defineProperty(module.exports, 'get', { writable: false, value: (type) => {
    if (typeof type !== 'function') {
        throw new Error("the 'type' parameter is not of type: Function");
    }
    const config = factoryConfig.find(cnf => cnf.name === type.name);
}});
