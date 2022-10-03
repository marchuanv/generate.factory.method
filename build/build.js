const { mkdirSync, existsSync } = require('fs');
const path = require('path');
const generatedFactorySpecsDir = path.join(__dirname, '../spec', 'factory', 'generated');
const generatedFactoryScriptsDir = path.join(__dirname, '../lib', 'factory', 'generated');

if (!existsSync(generatedFactorySpecsDir)){
    mkdirSync(generatedFactorySpecsDir);
}
if (!existsSync(generatedFactoryScriptsDir)){
    mkdirSync(generatedFactoryScriptsDir);
}

require('./type.info.generate');
// require('./type.binding.info.generate');
// require('./factory.container.bindings.info.generate');
// require('./factory.container.bindings.generate');
// require('./factory.info.generate');
// require('./factory.generate');
// require('./factory.containers.generate');

// require('./factory.container.bindings.generate');
// require('./factory.container.generate');
// require('./bindings.generate');