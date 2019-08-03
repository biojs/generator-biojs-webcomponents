"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const validators = require("./validator");

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);
    this.argument("projectDirectory", {
      type: String,
      required: false,
      default: "web-component",
      desc: `${chalk.blue(
        "path of the project directory, if you enter the path of a directory which does not exist, the generator will make one for you, otherwise it will use the existing one."
      )} Default directory: ${chalk.cyan("web-component")}`
    });
  }

  initializing() {
    this.composeWith(require.resolve("generator-license"), {
      defaultLicense: "MIT" // (optional) Select a default license
    });
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the laudable ${chalk.red(
          "generator-biojs-webcomponents"
        )} generator!`
      )
    );

    // First prompt
    const initialPrompts = [
      {
        type: "input",
        name: "start",
        message: "Press Enter key to get going!",
        validate: () => validators.storeArg(this.options.projectDirectory)
      },
      {
        type: "list",
        name: "upgradeOrMake",
        message: "What do you want to do today?",
        choices: [
          "Upgrade an existing component to a Web Component",
          "Make a new Web Component"
        ],
        default: 0
      }
    ];

    // Secondary prompts if user chooses to upgrade an existing component to Web component.
    const upgradeComponentPrompts = [
      {
        type: "rawlist",
        name: "importFrom",
        message:
          "I need the build file (generally index.js, main.js or componentName.js) for this, import it using one of the options -",
        choices: [
          "Install component from npm package. (Recommended - fastest way)",
          "Tell us the path of the build file on your local machine and I will import it in the project.",
          "Tell us the npm package name, version, build file URL and I will download the build file."
        ],
        default: 0
      }
    ];

    const installNpmPackagePrompts = [
      {
        type: "input",
        name: "packageNameToInstallComponent",
        message: "Enter the package name (case sensitive).",
        validate: validators.packageName
      },
      {
        type: "confirm",
        name: "confirmPackageNameToInstallComponent",
        message: "Press enter if the package description shown is correct."
      },
      {
        type: "rawlist",
        name: "changeImportSourceFromNpmPackage",
        message: "What do you want to do?",
        choices: [
          "Enter package name again to install component from npm package. (Recommended - fastest way)",
          "Import the file locally from your computer.",
          "Enter package name, version, build file URL to download the build file."
        ],
        when: function(responses) {
          if (responses.confirmPackageNameToInstallComponent) {
            return false; // Don't show this prompt, if user says that package description is correct.
          }

          return true; // Show this prompt if user says that package description is not correct.
        }
      },
      {
        type: "input",
        name: "checkVersionAndInstallComponent",
        message:
          "Great! I will import the latest version of the npm package, if you don't want this, enter the version.",
        default: "latest",
        when: function(responses) {
          if (responses.confirmPackageNameToInstallComponent) {
            return true; // Show this prompt if user says that package description is correct
          }

          return false; // Don't show this prompt if user says that package description is incorrect
        },
        validate: validators.checkVersionAndInstallComponent
      }
    ];

    // Prompts if user chooses to import file(s) using npm
    const npmPrompts = [
      {
        type: "input",
        name: "packageName",
        message: "Enter the package name (case sensitive).",
        validate: validators.packageName
      },
      {
        type: "confirm",
        name: "confirmPackageName",
        message: "Press enter if the package description shown is correct."
      },
      {
        type: "rawlist",
        name: "changeImportSourceFromNpmBuildFile",
        message: "What do you want to do?",
        choices: [
          "Enter package name again to install component from npm package. (Recommended - fastest way)",
          "Import the file locally from your computer.",
          "Enter package name, version, build file URL to download the build file."
        ],
        when: function(responses) {
          if (responses.confirmPackageName) {
            return false; // Don't show this prompt, if user says that package description is correct.
          }

          return true; // Show this prompt if user says that package description is not correct.
        }
      },
      {
        type: "input",
        name: "version",
        message:
          "Great! I will import the latest version of your file from the npm package, if you don't want this, enter the version.",
        default: "latest",
        when: function(responses) {
          if (responses.confirmPackageName) {
            return true; // Show this prompt if user says that package description is correct
          }

          return false; // Don't show this prompt if user says that package description is incorrect
        },
        validate: validators.version
      },
      {
        type: "input",
        name: "directoryName",
        message:
          "The build file will be imported in a separate directory in the project's root. Enter the name of this directory or press Enter if you like to go with default.",
        validate: validators.directoryName,
        when: function(responses) {
          if (responses.confirmPackageName) {
            return true; // Show this prompt if user says that package description is correct
          }

          return false; // Don't show this prompt if user says that package description is incorrect
        },
        default: "component-dist"
      },
      {
        type: "input",
        name: "importBuildFileFromNPM",
        message: function(answers) {
          return (
            "This URL - " +
            chalk.bold.yellow(
              "https://www.jsdelivr.com/package/npm/" +
                answers.packageName +
                "?version=" +
                answers.version
            ) +
            " contains the directory of the package, please find the build file (generally in the dist or build folder) and paste the link here, I will download it for you."
          );
        },
        when: function(responses) {
          if (responses.confirmPackageName) {
            return true; // Show this prompt if user says that package description is correct
          }

          return false; // Don't show this prompt if user says that package description is incorrect
        },
        validate: validators.importBuildFileFromNPM
      }
    ];

    // Prompt(s) if user chooses to import files locally from computer
    const localPrompts = [
      {
        type: "input",
        name: "directoryName",
        message:
          "The build file will be imported in a separate directory in the project's root. Enter the name of this directory or press Enter if you like to go with default.",
        validate: validators.directoryName,
        default: "component-dist"
      },
      {
        type: "input",
        name: "importBuildFileLocally",
        message: "Please enter the path of the build file.",
        validate: validators.importBuildFileLocally
      }
    ];

    // Secondary prompts is user chooses to make a new component and final prompts if user chooses to upgrade an existing component
    const commonPrompts = [
      {
        type: "input",
        name: "toolNameComputer",
        message:
          "Computer package name? This is a computer name with NO capital letters or special characters apart from the hyphen ( - ) .",
        validate: validators.toolNameComputer,
        default: "biojs-webcomponent-tool-name-here"
      },
      {
        type: "input",
        name: "toolNameHuman",
        message:
          'Thanks! Now, give me a human name for the project with only letters and NO special characters apart from the whitespace (space). e.g. "Genome Browser"',
        validate: validators.toolNameHuman,
        default: "BioJS component"
      },
      {
        type: "input",
        name: "description",
        message:
          "That's an amazing name. Now, describe your component in 2-3 lines."
      },
      {
        type: "input",
        name: "githubURL",
        message:
          "Almost done! Provide the GitHub URL of this component. (optional)"
      }
    ];

    /** Interacts with the user using prompts
     * Recursive so that user can go to a previous step and/or change method of importing file
     * @param {string} repeatPrompts tells the generator which prompts should be shown again (installNpmPackagePrompts or localPrompts or npmPrompts)
     * @returns {Promise} to execute prompts and wait for there execution to finish
     */
    const recursivePromptExecution = repeatPrompts => {
      // If user changes the method of importing later, recursive execution
      if (repeatPrompts) {
        // If user chooses to enter package name again when package description is incorrect
        if (
          repeatPrompts === npmPrompts[2].choices[0] ||
          repeatPrompts === installNpmPackagePrompts[2].choices[0]
        ) {
          return this.prompt(installNpmPackagePrompts).then(props => {
            // If user chooses to go back and choose source of importing file again
            if (props.changeImportSourceFromNpmPackage) {
              return recursivePromptExecution(
                props.changeImportSourceFromNpmPackage
              ); // Call the function recursively
            }

            return this.prompt(commonPrompts).then(props => {
              this.props = props;
              this.props.toolNameCamel = toCamelCase(props.toolNameHuman);
            });
          });
        }

        if (
          repeatPrompts === npmPrompts[2].choices[1] ||
          repeatPrompts === installNpmPackagePrompts[2].choices[1]
        ) {
          return this.prompt(localPrompts).then(() => {
            return this.prompt(commonPrompts).then(props => {
              this.props = props;
              this.props.toolNameCamel = toCamelCase(props.toolNameHuman);
            });
          });
        }

        if (
          repeatPrompts === npmPrompts[2].choices[2] ||
          repeatPrompts === installNpmPackagePrompts[2].choices[2]
        ) {
          return this.prompt(npmPrompts).then(props => {
            // If user chooses to go back and choose source of importing file again
            if (props.changeImportSourceFromNpmBuildFile) {
              return recursivePromptExecution(
                props.changeImportSourceFromNpmBuildFile
              ); // Call the function recursively
            }

            return this.prompt(commonPrompts).then(props => {
              this.props = props;
              this.props.toolNameCamel = toCamelCase(props.toolNameHuman);
            });
          });
        }
      }

      // Normal (initial) prompt execution
      return this.prompt(initialPrompts).then(props => {
        // If user chooses to upgrade an existing component
        if (props.upgradeOrMake === initialPrompts[1].choices[0]) {
          return this.prompt(upgradeComponentPrompts).then(props => {
            // If user chooses to install component as npm package
            if (props.importFrom === upgradeComponentPrompts[0].choices[0]) {
              return this.prompt(installNpmPackagePrompts).then(props => {
                // If user chooses to go back and choose source of importing file again
                if (props.changeImportSourceFromNpmPackage) {
                  return recursivePromptExecution(
                    props.changeImportSourceFromNpmPackage
                  ); // Call the function recursively
                }

                return this.prompt(commonPrompts).then(props => {
                  this.props = props;
                  this.props.toolNameCamel = toCamelCase(props.toolNameHuman);
                });
              });
            }

            // If user chooses to import build file locally
            if (props.importFrom === upgradeComponentPrompts[0].choices[1]) {
              return this.prompt(localPrompts).then(() => {
                return this.prompt(commonPrompts).then(props => {
                  this.props = props;
                  this.props.toolNameCamel = toCamelCase(props.toolNameHuman);
                });
              });
            }

            // If user chooses to import build file from npm package
            if (props.importFrom === upgradeComponentPrompts[0].choices[2]) {
              return this.prompt(npmPrompts).then(props => {
                // If user chooses to go back and choose source of importing again
                if (props.changeImportSourceFromNpmBuildFile) {
                  return recursivePromptExecution(
                    props.changeImportSourceFromNpmBuildFile
                  ); // Call the function recursively
                }

                return this.prompt(commonPrompts).then(props => {
                  this.props = props;
                  this.props.toolNameCamel = toCamelCase(props.toolNameHuman);
                });
              });
            }
          });
        }

        // If user chooses to make a new component
        if (props.upgradeOrMake === initialPrompts[1].choices[1]) {
          return this.prompt(commonPrompts).then(props => {
            this.props = props;
            this.props.toolNameCamel = toCamelCase(props.toolNameHuman);
          });
        }
      });
    };

    await recursivePromptExecution(); // Wait for the function execution to finish
  }

  writing() {
    this.destinationRoot(`./${this.options.projectDirectory}`);
    this.fs.copyTpl(
      this.templatePath("examples/index.html"),
      this.destinationPath("examples/index.html"),
      {
        title: this.props.toolNameHuman,
        toolNameComputer: this.props.toolNameComputer,
        toolNameCamel: this.props.toolNameCamel,
        githubURL: this.props.githubURL,
        description: this.props.description
      }
    );
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("index.html"),
      {
        title: this.props.toolNameHuman,
        toolNameComputer: this.props.toolNameComputer,
        githubURL: this.props.githubURL,
        description: this.props.description
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
    this.destinationRoot("./");
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
    this.log(
      `While I install the dependencies, you can read the next steps - \n1. Write the code for your component, instructions are in ${chalk.yellow(
        "src/index.js"
      )}.\n2. Add css styles to your component in ${chalk.yellow(
        "src/style"
      )}.less.\n3. Run ${chalk.yellow(
        "npm run less && npm run build"
      )}.\n4. Use your component in ${chalk.yellow(
        "examples/index.html"
      )}.\n5. Test your component using ${chalk.yellow(
        "npm start"
      )}.\n\nYou can read the detailed instructions in TODO.md.\n`
    );
  }
};

/**
 * Converts human friendly strings to camelcased space-free strings
 * @param {string} aString a prop taken in by yeoman's wizard
 * @return {aString}, but with spaces removed and camelCased.
 **/
function toCamelCase(aString) {
  let tokens = aString.split(" ");

  let camelString = "";
  tokens.map(function(token, index) {
    if (token.trim() !== "") {
      // Remove extra space between the words
      if (index) {
        camelString += token[0].toUpperCase(); // Capitalize the first letter of other words
      } else {
        camelString += token[0]; // Keep the first letter of the first word as it is
      }
    }

    camelString += token.substring(1, token.length);
    return true;
  });
  return camelString;
}
