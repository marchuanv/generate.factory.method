const utils = require("utils");
const path = require("path");
const { readFileSync, writeFileSync, existsSync } = require('fs');

function findNode({ parentNode, nodeName }) {
    for(const childNode of parentNode.childNodes) {
        if (nodeName && childNode.name.toLowerCase() === nodeName.toLowerCase()) {
            return { node: childNode };
        }
        const { node } = findNode({ parentNode: childNode, nodeName });
        if (node) {
            return { node };
        }
    };
    return { node: null };
}

function ensureRootNode({ nodeTreeFilePath }) {
    if (!module.exports.rootNode) {
        if (existsSync(nodeTreeFilePath)) {
            module.exports.rootNode = utils.getJSONObject(readFileSync(path.join(nodeTreeFilePath),'utf8'));
            module.exports.currentNode = null; 
        } else {
            module.exports.rootNode = { 
                Id: utils.generateGUID(),
                name: 'root',
                childNodes: [],
                data: null
            };
            module.exports.currentNode = null;
            module.exports.saveNodeTree({ nodeTreeFilePath });
        }
    }
    return module.exports.rootNode;
}

module.exports = {
    exists: ({ nodeName, nodeTreeFilePath }) => {
        const rootNode = ensureRootNode({ nodeTreeFilePath });
        const { node } = findNode({ parentNode: rootNode, nodeName });
        if (node) {
            return true;
        }
        return false;
    },
    updateNode: ({ nodeName, data }) => {
        const rootNode = ensureRootNode();
        const { node } = findNode({ parentNode: rootNode, nodeName });
        module.exports.currentNode = node;
    },
    createNode: ({ nodeName, parentNodeName, data, nodeTreeFilePath }) => {
        const rootNode = ensureRootNode({ nodeTreeFilePath });
        let parentNode = null;
        const { node } = findNode({ parentNode: rootNode, nodeName });
        ({ node: parentNode } = findNode({ parentNode: rootNode, nodeName: parentNodeName }));
        if (!parentNode) {
            parentNode = rootNode;
        }
        if (!node && parentNode) {
            module.exports.currentNode = {
                Id: utils.generateGUID(),
                name: nodeName,
                childNodes: [],
                data
            };
            parentNode.childNodes.push(module.exports.currentNode);
        }
    },
    saveNodeTree: ({ nodeTreeFilePath }) => {
        writeFileSync(nodeTreeFilePath, utils.getJSONString(module.exports.rootNode), 'utf8');
    }
};