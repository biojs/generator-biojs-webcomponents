# generator/app/index.js

```
this.argument("projectDirectory", {
      type: String,
      required: false,
      default: "web-component",
      desc: `${chalk.blue(
        "path of the project directory, if you enter the path of a directory which does not exist, the generator will make one for you, otherwise it will use the existing one."
      )} Default directory: ${chalk.cyan("web-component")}`
    });
```

This defines the project directory argument which is entered when the generator is run. The string value stored in the `desc` above is shown when user runs the command `yo @biojs/biojs-webcomponents --help`.  Each argument should have a desc field so that yeoman can provide help when user asks.

The methods listed after the `constructor` are default methods provided by yeoman which are executed in the order they are written which is - 
### 1. initializing()

Contains initialization methods

```
initializing() {
    this.composeWith(require.resolve("generator-license"), {
      defaultLicense: "MIT" // (optional) Select a default license
    });
  }
```

This embeds the [generator-license](https://github.com/jozefizso/generator-license) in our generator. The prompts of the `generator-license` will be asked after the prompts in `prompting()` method.

### 2. prompting()

Contains the question asked allowing with the validation, type of input, etc. for each question.

Note: For validating user inputs, validators are used which are in a separate file [validator.js](generator/app/validator.js), to make the code reusable and easy to understand.

The prompts are divided in multiple groups and are asked in a particular order which is give below -


If user chooses to make a new web component then firstly, `initialPrompts` are asked followed by `commonPrompts` and lastly the prompts for `generator-license` are asked.

If user chooses to upgrade an existing component to a web component, then -
1. `initialPrompts` are asked.
2. `upgradeComponentPrompts` are asked.

Based on which option user chooses out of the following, different prompts are asked - 
```
#1. Install component from npm package. (Recommended - fastest way)
#2. Tell us the path of the build file on your local machine and I will import it in the project.
#3. Tell us the npm package name, version, build file URL and I will download the build file.
```

3a. If user chooses #1 then `installNpmPackagePrompts` are asked.
3b. If user chooses #2 then `localPrompts` are asked.
3c. Is user chooses #3 then `npmPrompts` are asked.

4. Lastly, `commonPrompts` are asked followed by the prompts for `generator-license`.

This order of the prompts is ensured by `recursivePromptExecution` which is a recursive function because while upgrading components user may want to change the method of importing component for which there are prompts in each workflow of importing, if user wishes to change the method of importing, then this function will be executed again.

### 3. writing()

Generates the project files using the templates and inputs provided by user.

```
this.destinationRoot(`./${this.options.projectDirectory}`);
```

Changes the destination directory so that files are created in the directory whose path is entered in arguments.

### 4. install()

Installs the dependencies in project directory listed in templates/package.json.

The `toCamelCase` function converts the human name of the project into camel case.

# generator/app/validator.js

The validators not only validate the user inputs but also perform other functions like inporting build file, installing npm packages, making project directory etc.

### 1. storeArg

Makes the project directory whose path is entered in arguments while running the generator. If the generator fails to create a directory it will check if directory already exists before throwing an error to user. In case, this also fails, the generator will throw an error.

Note: We can access the user input of the current question in the `props` parameter, there is no need to explicitly send this while calling validator function. 

```
async function(props) {
  projectDirectory = props;
  if (projectDirectory.trim() === ".") {
    return true;
  }

  let res = await executeCommand("mkdir " + projectDirectory)
    .then(() => true)
    .catch(async () => {
      let tryAgain = await executeCommand(
        "ls " + projectDirectory,
        "checkDirExistence"
      )
        .then(() => true)
        .catch(err => {
          return chalk.red(
            `Oops! We encountered an error. Please see below for the more details - \n${chalk.yellow(
              err
            )}\n.Try this - cd into that directory and run ${chalk.cyan(
              "`yo @biojs/biojs-webcomponents .`"
            )}.`
          );
        });
      return tryAgain;
    });
  return res;
};
```

Used in `initialPrompts`.

### 2. packageName

Checks whether a package exists and shows it description if it does otherwise throws an error, uses the `npm view <package-name>` command provided by npm to do this.

Used in `installNpmPackagePrompts` (to install component as npm package) as well as `npmPrompts` (to import the build file from npm).

### 3. version

Checks whether a version is valid or not using the `npm view <package-name>@<version>` command. 

```
async function(props, answers) {
.....
.....
..
};
```

The second parameter contains the `answer hash` (all the answers by user upto the previous question), like `props` there is no need to send it explicitly while calling the validator function.

Used in `npmPrompts` (to import the build file from npm). 

### 4. checkVersionAndInstallComponent

Validates the version and installs the component from npm if version is valid, throws an error otherwise.

### 5. directoryName

The build file is imported in a separate directory whose default name is `component-dist`, otherwise user can enter any name of their choice. If the directory with the same name already exists it shows an error and provides the following options -

1. Overwrite the contents the of the existing directory.
2. Make a new directory with a new name.

### 6. importBuildFileFromNPM

After user enters the package name and version and they are validated, the user is shown a URL (using JSDelivr - https://www.jsdelivr.com/package/npm/<package-npm>?version=<version>) and asked to go to that URL which contains the directory of that package, find the build file and paste its URL, the validator `importBuildFileFromNPM` downloads that file.

### 7. importBuildFileLocally

Copies and pastes the build file whose path is entered in the prompt.

### 8. toolNameComputer

Checks whether the toolNameComputer is formatted correctly using a regular expression.

### 9. toolNameHuman

Checks whether the toolNameHuman is formatted correctly using a regular expression.

Note - The function `executeCommand` uses the `exec` command to execute the asynchronous tasks like importing build file, installing component, etc. The parameter `type` is used to stop unnecessary output from logging and show the output to user only when its necessary.

One more reason the validators are in a separate file is because to test the generator, we need to test if the validators are working correctly and if they are defined like `validate: function promptValidator() {...}`, it makes it impossible to test them.

`ora` is used to show the loader whenever an asynchronous task is performed and `chalk` is used to highlight the messages, output and errors using colors.

