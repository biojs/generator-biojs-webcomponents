# generator-biojs-webcomponents [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
Generates the scaffold for a BioJS component automatically so you don't have to do it yourself. 

This is the guide for contributing to this project. If you want to know about the generator and how to install and use it, you can read [this guide](README.md).

## Contribute

To contribute, clone this repository, install yeoman and run the code.

Step 1: Clone the repository.

a) Using HTTPS -

```
git clone https://github.com/biojs/generator-biojs-webcomponents.git
```

b) Using SSH -

```
git clone git@github.com:biojs/generator-biojs-webcomponents.git
```

Step 2: Go to generator's directory

```
cd generator-biojs-webcomponents
```

Step 3: Install yeoman

```
npm install -g yo
```

Step 4: Symlink the package

```
npm link
```

Step 5: Go out of the generator's directory. Run and test the generator locally.

```
cd ..
mkdir test-biojs-generator
cd test-biojs-generator
yo biojs-webcomponents
```

Note: If you have installed the generator-biojs-webcomponents globally, there is no need to worry, this method will still work. You do not need to uninstall anything.

### About the project

The project directory has the following structure -

```bash
├── __tests__
│   └────── app.js
├── .github
│   └────── issue_template.md
│   └────── pull_request_template.md
├── generators
│   └────── app
│           └────── templates
|           |       ├── dev
|           |       │   └────── serve.js
|           |       ├── examples
|           |       │   └────── index.html
|           |       ├── img
|           |       │   └────── favicon.png
|           |       ├── node_modules
|           |       │   ├────── modules
|           |       ├── src
|           |       │   ├────── index.js
|           |       │   └────── style.less
|           |       ├── index.html
|           |       ├── LICENSE
|           |       ├── package.json
|           |       ├── package-lock.json
|           |       ├── README.md
|           |       └── webpack.config.js
|           |
│           └────── index.js
│           └────── validator.js
├── node_modules
│   ├────── modules
├── .editorconfig
├── .eslintignore
├── .gitattributes
├── .gitignore
├── .travis.yml
├── .yo-rc.json
├── .CONTRIBUTING.md
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

#### __tests__
Contains the test file - app.js which has all the tests for the generator.

#### .github
Contains templates for GitHub issues and pull requests, make sure to follow these when you submit an issue/PR.

#### generators
Contains all the code for generator.

1. app/templates - Contains all the templates which are generated whenever any user runs the generator. Read the directory structure and the purpose of each folder inside the templates folder [here](README.md##ii-description-of-your-projects-folder-structure).

2. app/index.js - Contains all the initializing code, prompts, writing code which actually uses the [templates](generators/app/templates) to generate the web-component project and installs required dependencies. 

3. app/validator.js - Contains the validator functions for the prompts which checks user inputs and also performs other functions like copying the build file, installing the component as npm package, downloading the build file from npm package and validating npm package's version.

To understand the code in `2. app/index.js` and `3. app/validator.js`, read the [developer docs](DEV_DOCS.md).
All the other files are self explanatory.

### To-do / roadmap. 

See [issues](issues) for more details - we still need the following: 

1. Scaffolder for _new_ browser tools (i.e. not just a wrapper for older tools)
2. Scaffolder for command line tools. 

## License

MIT © [Yo Yehudi](http://www.yo-yehudi.com)

[npm-image]: https://badge.fury.io/js/%40biojs%2Fgenerator-biojs-webcomponents.svg
[npm-url]: https://npmjs.org/package/%40biojs%2Fgenerator-biojs-webcomponents
[travis-image]: https://travis-ci.org/biojs/generator-biojs-webcomponents.svg?branch=master
[travis-url]: https://travis-ci.org/biojs/generator-biojs-webcomponents
[daviddm-image]: https://david-dm.org/biojs/generator-biojs-webcomponents.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/biojs/generator-biojs-webcomponents
