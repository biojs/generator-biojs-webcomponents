"use strict";
const chalk = require("chalk");
const { exec } = require("child_process");
const ora = require("ora");
const validators = {};

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
          "Oops! We encountered an error, please see the log below for more details.\n" +
            err
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
            chalk.red.bold(props) +
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
          "npm i " + answers.packageNameToInstallComponent + "@" + props
        )
          .then(() => true)
          .catch(err => {
            chalk.red(
              "Oops! We encountered an error, please see the log below for more details.\n" +
                err
            );
          });
        return res;
      })
      .catch(() =>
        chalk.red(
          "Sorry, the version - " +
            chalk.red.bold(props) +
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

validators.importBuildFileFromNPM = async function(props) {
  if (props) {
    if (props === "skip") {
      return true;
    }

    var res = await executeCommand(
      "mkdir component-dist && cd component-dist && curl -O " + props,
      "importBuildFileFromNPM"
    )
      .then(() => {
        return true;
      })
      .catch(async err => {
        if (err.code === 1) {
          return chalk.red(
            `Sorry, there already seems to be a directory with the same name ${chalk.cyan(
              "(component-dist)"
            )}, please change it's name or move it.\n   If you want to just copy this file into that directory, enter ${chalk.cyan(
              "skip"
            )}.\n`
          );
        }

        if (err.code === 3 || err.code === 23) {
          return chalk.red(
            "The URL is malformed. Please ensure the URL is in correct format."
          );
        }

        return chalk.red(
          "Oops! We encountered an error, please see the log below for more details.\n" +
            err
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

validators.copyBuildFileFromNPM = async props => {
  if (props) {
    var res = executeCommand(
      "cd component-dist && curl -O " + props,
      "copyBuildFileFromNPM"
    )
      .then(() => {
        return true;
      })
      .catch(async err => {
        if (err.code === 3 || err.code === 23) {
          return chalk.red(
            "The URL is malformed. Please ensure the URL is in correct format."
          );
        }

        return chalk.red(
          "Oops! We encountered an error, please see the log below for more details.\n" +
            err
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

validators.importBuildFileLocally = async props => {
  if (props) {
    if (props === "skip") {
      return true;
    }

    var res = executeCommand(
      "mkdir component-dist && cp " + props + " component-dist",
      "importBuildFileLocally"
    )
      .then(() => {
        return true;
      })
      .catch(async err => {
        if (err.code === 1) {
          return chalk.red(
            `Oops! We encountered an error. This can happen due to one of the following reasons - \n\n1) The path of build file entered is incorrect. \n2) There's already a directory named ${chalk.cyan(
              "component-dist"
            )}, in this case please input ${chalk.cyan(
              "skip"
            )} to paste the build file in your existing directory.\n\nPlease see below for the exact error description - \n${chalk.yellow(
              err
            )}`
          );
        }

        return chalk.red(
          "Oops! We encountered an error, please see the log below for more details.\n" +
            err
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

validators.copyBuildFileLocally = async props => {
  if (props) {
    var res = executeCommand(
      "cp " + props + " component-dist",
      "copyBuildFileLocally"
    )
      .then(() => {
        return true;
      })
      .catch(async err => {
        return chalk.red(
          "Oops! We encountered an error, please see the log below for more details.\n" +
            err
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
          let err = "Sorry, that version does not exist!";
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
