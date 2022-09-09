const utils = require('utils');
const path = require('path');
const { JSDOM } = require("jsdom");
fdescribe("JSDOM", () => {
    it("it should work", () => {
        const options = {
            runScripts: "dangerously",
            resources: "usable"
        };
        const componentMinJSPath = `file://${path.join(__dirname, '../', '../', 'component.min.js')}`;
        const source = `<!DOCTYPE html><html><body><div id="test"></div><script>require = (mod) => { console.log('requiring: ', mod); }</script><script src="${componentMinJSPath}"></script></body></html>`;
        const dom = new JSDOM(source, options);
        expect(dom).not.toBeNull();
        expect(dom).not.toBeUndefined();
        dom.window.onload = () => {
            expect(dom.window.component).not.toBeNull();
            expect(dom.window.component).not.toBeUndefined();
            expect(dom.window.createComponent).not.toBeNull();
            expect(dom.window.createComponent).not.toBeUndefined();
        }
        dom.window.onerror = (err) => {
            fail(err)
        }
    });
});