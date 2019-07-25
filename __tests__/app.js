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
  it("imports the build file", async () => {
    await validators
      .importBuildFileLocally(
        path.join(__dirname, "../generators/app/validator.js")
      )
      .then(() => {
        assert.file(["component-dist/validator.js"]);
      });
  });
  it("only pastes the build file", async () => {
    // This will work as the directory component-dist already exists because of the above test
    await validators
      .copyBuildFileLocally(path.join(__dirname, "../LICENSE"))
      .then(() => {
        assert.file(["component-dist/LICENSE"]);
      });
  });
  it("skips the current question if user enters skip", async () => {
    assert.equal(await validators.importBuildFileLocally("skip"), true);
  });
  it("throws an error if user enters an empty string as path of build file", async () => {
    assert.equal(
      await validators.importBuildFileFromNPM(""),
      chalk.red("This is a mandatory field, please answer.")
    );
  });
  it("throws an error if user enters an empty string as path of build file to be copied", async () => {
    assert.equal(
      await validators.copyBuildFileLocally(""),
      chalk.red("This is a mandatory field, please answer.")
    );
  });
});

describe("generator-biojs-webcomponents:app - Upgrade an existing component by importing build file using npm", () => {
  it("works successfully if the package name and version entered is correct", async () => {
    assert.equal(
      await validators.version("fkdk", { packageName: "node" }),
      chalk.red(
        "Sorry, the version - " +
          chalk.red.bold("fkdk") +
          " doesn't exist. Please enter again. Enter " +
          chalk.cyan("latest") +
          " if you want to import the latest version."
      )
    );
  });
  it("skips the current question if user enters skip", async () => {
    assert.equal(await validators.importBuildFileFromNPM("skip"), true);
  });
  it("downloads the file if URL entered is correct", async () => {
    // This will work as the directory component-dist is already created above
    await validators
      .copyBuildFileFromNPM(
        "https://cdn.jsdelivr.net/npm/ProtVista@2.0.13/build/protvista.min.gz.js"
      )
      .then(() => {
        assert.file(["component-dist/protvista.min.gz.js"]);
      });
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
  it("throws an error if downloadURL for build file to copied entered is empty", async () => {
    assert.equal(
      await validators.copyBuildFileFromNPM(""),
      chalk.red("This is a mandatory field, please answer.")
    );
  });
});
