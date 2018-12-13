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
          'Thanks! Now, give me a human name for the project - e.g. "Genome Browser"',
        default: "BioJS component"
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
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
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js"),
      {
        toolNameComputer: this.props.toolNameComputer
      }
    );

    this.fs.copyTpl(
      this.templatePath("config.json"),
      this.destinationPath("config.json"),
      {
        accepts: JSON.stringify(this.props.accepts),
        toolNameHuman: this.props.toolNameHuman,
        toolNameComputer: this.props.toolNameComputer,
        classes: stringToMultiValue(this.props.classes)
      }
    );

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      {
        author: this.props.author,
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
        toolNameComputer: this.props.toolNameComputer
      }
    );

    this.fs.copyTpl(
      this.templatePath("src/index.js"),
      this.destinationPath("src/index.js"),
      {}
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

function stringToMultiValue(values) {
  // Split and trim values. Return pseudo-aray.
  var vals = values.split(",");
  // No more whitespace, please
  vals = vals.map(val => val.replace(/\s+/g, ""));
  return JSON.stringify(vals);
}
