"use strict";
const chalk = require("chalk");
const { exec } = require("child_process");
const ora = require("ora");
const validators = {};
let buildDirectory;
validators.packageName = async function(props) {
  if (props) {
    let command = "npm view " + props;
    let res = await executeCommand(command, "packageName")
      .then(() => {
        return true;
      })
      .catch(err => {
        if (err.code === 1) {
          return chalk.red(
            "There's no package on npm with the name " +
              chalk.red.bold(props) +
              ". Please note that the package name is case sensitive."
          );
        }

        return chalk.red(
          `Oops! We encountered an error. Please see below for the more details - \n${chalk.yellow(
            err
          )}`
        );
      });
    return res;
    /**
     * Returns true if command is succesfully executed and hence yeoman proceeds to the next prompt
     * returns and logs the error if command execution fails
     */
  }

  return chalk.red("This is a mandatory field, please answer."); // Warn user if no input is entered
};

validators.version = async function(props, answers) {
  if (props) {
    let command = "npm view " + answers.packageName + "@" + props;
    var res = await executeCommand(command, "version")
      .then(() => {
        return true;
      })
      .catch(() =>
        chalk.red(
          "Sorry, the version - " +
            chalk.yellow(props) +
            " doesn't exist. Please enter again. Enter " +
            chalk.cyan("latest") +
            " if you want to import the latest version."
        )
      );
    return res;
  }

  return chalk.red(
    "This is a mandatory field, please answer. Enter " +
      chalk.cyan("latest") +
      " if you want to import the latest version."
  ); // Warn user if no input is entered
};

validators.checkVersionAndInstallComponent = async function(props, answers) {
  if (props) {
    let command =
      "npm view " + answers.packageNameToInstallComponent + "@" + props;
    var res = await executeCommand(command, "version")
      .then(async () => {
        var res = await executeCommand(
          "npm i " + answers.packageNameToInstallComponent + "@" + props,
          "checkVersionAndInstallComponent"
        )
          .then(() => true)
          .catch(err => {
            return chalk.red(
              `Oops! We encountered an error. Please see below for the more details - \n${chalk.yellow(
                err
              )}`
            );
          });
        return res;
      })
      .catch(() =>
        chalk.red(
          "Sorry, the version - " +
            chalk.yellow(props) +
            " doesn't exist. Please enter again. Enter " +
            chalk.cyan("latest") +
            " if you want to import the latest version."
        )
      );
    return res;
  }

  return chalk.red(
    "This is a mandatory field, please answer. Enter " +
      chalk.cyan("latest") +
      " if you want to import the latest version."
  ); // Warn user if no input is entered
};

validators.directoryName = async props => {
  var res;
  if (props.trim() === "o") {
    res = await executeCommand(`rm -rf ${buildDirectory}/*`)
      .then(() => true)
      .catch(err => {
        return chalk.red(
          `Oops! We encountered an error. Please see below for the more details - \n${chalk.yellow(
            err
          )}`
        );
      });
    return res;
  }

  if (props) {
    buildDirectory = props;
    res = await executeCommand("mkdir " + props)
      .then(() => true)
      .catch(err => {
        return chalk.red(
          "Uh oh! There already exists a directory with the same name. Enter a new name again or enter " +
            chalk.cyan("o") +
            " if you want to overwrite the contents of this directory and then import the build file. please see the log below for more details.\n" +
            chalk.yellow(err)
        );
      });
    return res;
  }

  return chalk.red("This is a mandatory field, please answer.");
};

validators.importBuildFileFromNPM = async function(props) {
  if (props) {
    var res = await executeCommand(
      "cd " + buildDirectory + " && curl -O " + props,
      "importBuildFileFromNPM"
    )
      .then(() => {
        return true;
      })
      .catch(err => {
        if (err.code === 3 || err.code === 23) {
          return chalk.red(
            "The URL is malformed. Please ensure the URL is in correct format."
          );
        }

        return chalk.red(
          `Oops! We encountered an error. Please see below for the more details - \n${chalk.yellow(
            err
          )}`
        );
      }); // Import the build file in component-dist directory from npm
    return res;
    /**
     * Returns true if command execution is successful and proceeds to commonPrompts
     * returns and logs the error if execution fails
     */
  }

  return chalk.red("This is a mandatory field, please answer.");
};

validators.importBuildFileLocally = async props => {
  if (props) {
    var res = await executeCommand(
      "cp " + props + " " + buildDirectory,
      "importBuildFileLocally"
    )
      .then(() => {
        return true;
      })
      .catch(err => {
        return chalk.red(
          `Oops! We encountered an error. Please see below for the more details - \n${chalk.yellow(
            err
          )}`
        );
      }); // Import the build file in component-dist directory locally from computer
    return res;
    /**
     * Returns true if command execution is successful and proceeds to commonPrompts
     * returns and logs the error if execution fails
     */
  }

  return chalk.red("This is a mandatory field, please answer.");
};

validators.toolNameComputer = props => {
  if (props.trim() === "") {
    return chalk.red("This is a mandatory field, please answer.");
  }

  if (
    props.match(/^[a-z0-9-]+$/) &&
    props[0] !== "-" &&
    props[props.length - 1] !== "-"
  ) {
    return true;
  }

  return chalk.red(
    "This is not a valid computer name for the project, you can use only small letters, number and hyphen and it should not begin or end with hypen. Enter again."
  );
};

validators.toolNameHuman = props => {
  if (props.trim() === "") {
    return chalk.red("This is a mandatory field, please answer.");
  }

  if (props.match(/^[A-Za-z ]+$/ || /^[A-Za-z\s]+$/) && props.trim() !== "") {
    return true;
  }

  return chalk.red(
    "This is not a valid human name for the project, you can use only letters and whitespace. Enter again."
  );
};

/**
 * Executes command in terminal and returns the output or error
 * @param {string} command the command to be executed
 * @param {string} type whether the command is related to npm or not
 * @returns {Promise}, resolves and returns true if execution is successful, rejects and returns error otherwise.
 */
function executeCommand(command, type) {
  const spinner = ora({
    text: "Loading..",
    spinner: "weather"
  });
  spinner.start();
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout) => {
      if (err) {
        // The command couldn't be executed
        spinner.stop();
        reject(err);
      } else if (
        type === "version" ||
        type === "checkVersionAndInstallComponent"
      ) {
        // Command successfully executed
        if (stdout) {
          spinner.stop();
          resolve(true);
        } else {
          spinner.stop();
          reject(err);
        }
      } else if (stdout) {
        process.stdout.write(`\n ${stdout} \n`); // If there is an output display it
        spinner.stop();
        resolve(true);
      } else {
        spinner.stop();
        resolve(true);
      }
    });
  });
}

module.exports = validators;
