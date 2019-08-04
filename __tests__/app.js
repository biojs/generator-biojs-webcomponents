"use strict";
const path = require("path");
const chalk = require("chalk");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const validators = require("../generators/app/validator");

describe("generator-biojs-webcomponents:app - Make a new Web Component", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      upgradeOrMake: "Make a new Web Component",
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
        '<test-component-tool geneId="BRCA1" class="BiojsTestComponent"></test-component-tool>'
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
        upgradeOrMake: "Make a new Web Component",
        toolNameComputer: "",
        toolNameHuman: ""
      })
      .then(() => {
        assert.fileContent([
          [
            "examples/index.html",
            '<biojs-webcomponent-tool-name-here geneId="BRCA1" class="BioJSComponent"></biojs-webcomponent-tool-name-here>'
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
  it("throws an error if user enters an empty string as toolNameHuman", async () => {
    assert.equal(
      await validators.toolNameHuman(""),
      chalk.red("This is a mandatory field, please answer.")
    );
  });
  it("throws an error if user enters an empty string as toolNameComputer", async () => {
    assert.equal(
      await validators.toolNameComputer(""),
      chalk.red("This is a mandatory field, please answer.")
    );
  });
});

describe("generator-biojs-webcomponents:app - Upgrade an existing component by importing build file locally", () => {
  it("runs the generator in the directory passed in arguments", async () => {
    await validators.storeArg("test-component").then(() => {
      assert.file("test-component");
    });
  });
  it("makes a new directory named - component-dist", async () => {
    await validators
      .directoryName("component-dist")
      .then(() => assert.file(["test-component/component-dist"]));
  });
  it("imports the build file", async () => {
    await validators
      .importBuildFileLocally(
        path.join(__dirname, "../generators/app/validator.js")
      )
      .then(() => {
        assert.file(["test-component/component-dist/validator.js"]);
      });
  });
  it("throws an error if user enters an empty string as path of build file", async () => {
    assert.equal(
      await validators.importBuildFileFromNPM(""),
      chalk.red("This is a mandatory field, please answer.")
    );
  });
});

describe("generator-biojs-webcomponents:app - Upgrade an existing component by importing build file using npm", () => {
  it("throws an error if version entered does not exist", async () => {
    assert.equal(
      await validators.version("fkdk", { packageName: "node" }),
      chalk.red(
        "Sorry, the version - " +
          chalk.yellow("fkdk") +
          " doesn't exist. Please enter again. Enter " +
          chalk.cyan("latest") +
          " if you want to import the latest version."
      )
    );
  });
  it("throws an error if an npm package doesn't exist", async () => {
    assert.equal(
      await validators.packageName("cbaxyz"),
      chalk.red(
        "There's no package on npm with the name " +
          chalk.red.bold("cbaxyz") +
          ". Please note that the package name is case sensitive."
      )
    );
  });
  it("throws an error if an user enters an empty string as the package name", async () => {
    assert.equal(
      await validators.packageName(""),
      chalk.red("This is a mandatory field, please answer.")
    );
  });
  it("throws an error if version entered is empty", async () => {
    assert.equal(
      await validators.version("", { packageName: "node" }),
      chalk.red(
        "This is a mandatory field, please answer. Enter " +
          chalk.cyan("latest") +
          " if you want to import the latest version."
      )
    );
  });
  it("throws an error if downloadURL entered is empty", async () => {
    assert.equal(
      await validators.importBuildFileFromNPM(""),
      chalk.red("This is a mandatory field, please answer.")
    );
  });
});
