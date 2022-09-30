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
require('./factory.info.generate');
require('./factory.generate');
// require('./bindings.generate');
// require('./container.generate');