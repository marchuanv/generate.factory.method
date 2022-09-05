const utils = require('utils');
const { JSDOM } = require("jsdom");
fdescribe("JSDOM", () => {
    it("it should work", () => {
        const dom = new JSDOM(`<html><head><script src="../../component.min.js"></script></head><body></body><html>`, { runScripts: "dangerously" });
        expect(dom).not.toBeNull();
        expect(dom).not.toBeUndefined();
        dom.window.onload = () => {
            expect(dom.window.component).not.toBeNull();
            expect(dom.window.component).not.toBeUndefined();
            expect(dom.window.createComponent).not.toBeNull();
            expect(dom.window.createComponent).not.toBeUndefined();
        }
        dom.window.onerror = (err) => {
            console.log('error:', err);
        }
    });
});