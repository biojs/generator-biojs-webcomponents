"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  initializing() {
    this.composeWith(require.resolve("generator-license"), {
      defaultLicense: "MIT" // (optional) Select a default license
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the laudable ${chalk.red(
          "generator-biojs-webcomponents"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "toolNameComputer",
        message:
          "Computer package name? This is a computer name with no capital letters or special characters apart from the - dash.",
        default: "biojs-webcomponent-tool-name-here"
      },
      {
        type: "input",
        name: "toolNameHuman",
        message:
          'Thanks! Now, give me a human name for the project with only letters and NO special characters. e.g. "Genome Browser"',
        default: "BioJS component"
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.toolNameCamel = toCamelCase(props.toolNameHuman);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("examples/index.html"),
      this.destinationPath("examples/index.html"),
      {
        title: this.props.toolNameHuman,
        toolNameComputer: this.props.toolNameComputer
      }
    );
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("index.html"),
      {
        title: this.props.toolNameHuman,
        toolNameComputer: this.props.toolNameComputer
      }
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      {
        toolNameCamel: this.props.toolNameCamel
      }
    );

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        author: this.props.author,
        homepage: this.props.homepage,
        toolNameHuman: this.props.toolNameHuman,
        toolNameComputer: this.props.toolNameComputer,
        licence: this.props.licence
      }
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      {
        author: this.props.author,
        toolNameHuman: this.props.toolNameHuman,
        toolNameComputer: this.props.toolNameComputer,
        licence: this.props.licence
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/style.less"),
      this.destinationPath("src/style.less"),
      {
        toolNameCamel: this.props.toolNameCamel
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/index.js"),
      this.destinationPath("src/index.js"),
      {
        toolNameComputer: this.props.toolNameComputer,
        toolNameCamel: this.props.toolNameCamel
      }
    );

    this.fs.copyTpl(
      this.templatePath("dev/serve.js"),
      this.destinationPath("dev/serve.js")
    );

    this.fs.copyTpl(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copyTpl(
      this.templatePath("TODO.md"),
      this.destinationPath("TODO.md")
    );

    this.fs.copyTpl(
      this.templatePath("img/favicon.png"),
      this.destinationPath("img/favicon.png")
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};

/**
 * Converts human friendly strings to camelcased space-free strings
 * @param {string} aString a prop taken in by yeoman's wizard
 * @return {aString}, but with spaces removed and camelCased.
 **/
function toCamelCase(aString) {
  var tokens = aString.split(" ");

  var camelString = "";
  tokens.map(function(token, index) {
    if (index) {
      camelString += token[0].toUpperCase(); // Capitalize the first letter of other words
    } else {
      camelString += token[0]; // Keep the first letter of the first word as it is
    }

    camelString += token.substring(1, token.length);
    return true;
  });
  return camelString;
}
