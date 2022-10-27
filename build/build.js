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

require('./factory.container.context.info.generate')({ contextName: 'MultipleRequestsSpec' });
require('./factory.container.context.info.generate')({ contextName: 'UserSecuritySpec' });
require('./factory.container.context.info.generate')({ contextName: 'ClientComponentSpec' });
require('./factory.container.context.info.generate')({ contextName: 'ServerComponentSpec' });
require('./factory.container.context.info.generate')({ contextName: 'ClientMessageBusSpec' });
require('./factory.container.context.info.generate')({ contextName: 'ServerMessageBusSpec' });
require('./factory.container.context.info.generate')({ contextName: 'HttpServerResponseMessageBusSpec' });
require('./factory.container.context.info.generate')({ contextName: 'HttpClientRequestMessageBusSpec' });

require('./factory.info.generate');

require('./factory.container.context.generate')({ contextName: 'MultipleRequestsSpec' });
require('./factory.container.context.generate')({ contextName: 'UserSecuritySpec' });
require('./factory.container.context.generate')({ contextName: 'ClientComponentSpec' });
require('./factory.container.context.generate')({ contextName: 'ServerComponentSpec' });
require('./factory.container.context.generate')({ contextName: 'ClientMessageBusSpec' });
require('./factory.container.context.generate')({ contextName: 'ServerMessageBusSpec' });
require('./factory.container.context.generate')({ contextName: 'HttpServerResponseMessageBusSpec' });
require('./factory.container.context.generate')({ contextName: 'HttpClientRequestMessageBusSpec' });

require('./factory.generate');


