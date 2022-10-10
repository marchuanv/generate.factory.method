const { mkdirSync, existsSync } = require('fs');
const path = require('path');

const factorySpecsDir = path.join(__dirname, '../spec', 'factory');
const factoryLibDir = path.join(__dirname, '../lib', 'factory');
if (!existsSync(factorySpecsDir)){
    mkdirSync(factorySpecsDir);
}
if (!existsSync(factoryLibDir)){
    mkdirSync(factoryLibDir);
}

const generatedFactorySpecsDir = path.join(__dirname, '../spec', 'factory', 'generated');
const generatedFactoryScriptsDir = path.join(__dirname, '../lib', 'factory', 'generated');
if (!existsSync(generatedFactorySpecsDir)){
    mkdirSync(generatedFactorySpecsDir);
}
if (!existsSync(generatedFactoryScriptsDir)){
    mkdirSync(generatedFactoryScriptsDir);
}

require('./type.info.generate');
require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'Default' });
require('./factory.info.generate')({ factoryContainerBindingName: 'Default' });
require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'Default' });
require('./factory.generate');
