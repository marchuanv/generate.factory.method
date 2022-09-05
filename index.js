const context = global || document;
if (!context.require){
    context.require = (scriptSource) => {
        var script  = document.createElement("script");
        script.type = 'text/javascript';
        script.src = scriptSource;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
if (module) {
    const path = require('path');
    const { createComponent } = require("./lib/factory/component.factory");
    const packageJson = require(path.join(module.parent.path, 'package.json'));
    module.exports = createComponent({ scopeId: packageJson.name, packageJson });
}