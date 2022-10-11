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

require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'MultipleRequestsSpec' });
require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'UserSecuritySpec' });
require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'ClientComponentSpec' });
require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'ServerComponentSpec' });
require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'ClientMessageBusSpec' });
require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'ServerMessageBusSpec' });
require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'HttpServerResponseMessageBusSpec' });
require('./factory.container.bindings.info.generate')({ factoryContainerBindingName: 'HttpClientRequestMessageBusSpec' });

require('./factory.info.generate')({ factoryContainerBindingName: 'MultipleRequestsSpec' });
require('./factory.info.generate')({ factoryContainerBindingName: 'UserSecuritySpec' });
require('./factory.info.generate')({ factoryContainerBindingName: 'ClientComponentSpec' });
require('./factory.info.generate')({ factoryContainerBindingName: 'ServerComponentSpec' });
require('./factory.info.generate')({ factoryContainerBindingName: 'ClientMessageBusSpec' });
require('./factory.info.generate')({ factoryContainerBindingName: 'ServerMessageBusSpec' });
require('./factory.info.generate')({ factoryContainerBindingName: 'HttpServerResponseMessageBusSpec' });
require('./factory.info.generate')({ factoryContainerBindingName: 'HttpClientRequestMessageBusSpec' });

require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'MultipleRequestsSpec' });
require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'UserSecuritySpec' });
require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'ClientComponentSpec' });
require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'ServerComponentSpec' });
require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'ClientMessageBusSpec' });
require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'ServerMessageBusSpec' });
require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'HttpServerResponseMessageBusSpec' });
require('./factory.container.bindings.generate')({ factoryContainerBindingName: 'HttpClientRequestMessageBusSpec' });

require('./factory.generate');


