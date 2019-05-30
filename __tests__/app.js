"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-biojs-webcomponents:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      toolNameComputer: "test-component-tool",
      toolNameHuman: "Biojs test component"
    });
  });

  it("creates expected files", () => {
    assert.file([
      "examples/index.html",
      "src/index.js",
      "src/style.less",
      ".gitignore",
      "index.html",
      "package.json",
      "README.md",
      "TODO.md",
      "webpack.config.js"
    ]);
  });
  it("initialises server script", () => {
    assert.file(["dev/serve.js"]);
  });
  it("initialises the component with correct user inputs", () => {
    assert.fileContent([
      [
        "examples/index.html",
        '<test-component-tool geneId="BRCA1"></test-component-tool>'
      ],
      ["examples/index.html", "<h1>Biojs test component demo</h1>"],
      ["src/index.js", "define('test-component-tool', BiojsTestComponent);"],
      ["src/style.less", ".BiojsTestComponent"]
    ]);
  });
  it("initialises the component with default names if user inputs nothing", () => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({
        toolNameComputer: "",
        toolNameHuman: ""
      })
      .then(() => {
        assert.fileContent([
          [
            "examples/index.html",
            '<biojs-webcomponent-tool-name-here geneId="BRCA1"></biojs-webcomponent-tool-name-here>'
          ],
          ["examples/index.html", "<h1>BioJS component demo</h1>"],
          [
            "src/index.js",
            "define('biojs-webcomponent-tool-name-here', BioJSComponent);"
          ],
          ["src/style.less", ".BioJSComponent"]
        ]);
      });
  });
});
