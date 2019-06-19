# generator-biojs-webcomponents [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
Generates the scaffold for a BioJS component automatically so you don't have to do it yourself. 

### What this tool currently does

This tool is specifically designed keeping in mind the idea of re-packaging existing components, so you can upgrade your components to BioJS 3 component style without having to re-write your component.

## I. Getting started.

Step 0: Install [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) (npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer).

Note: If you need to manage multiple versions of node also consider [nvm](https://github.com/creationix/nvm).

Step 1: Install [Yeoman](http://yeoman.io).

```bash
npm install -g yo
```

Step 2a: Install [generator-biojs-webcomponents](https://www.npmjs.com/package/@biojs/generator-biojs-webcomponents).

Note that below you can change my-new-component to the folder name of your choice. e.g. - your project name. 

```bash
mkdir my-new-component 
cd my-new-component
npm install -g yo @biojs/generator-biojs-webcomponents
```

Step 2b: Generate your new project.

```bash
yo @biojs/biojs-webcomponents
```

After running this, you will be asked some questions about the details of your project, after which the required dependencies will be automatically installed.

Once it's complete, look at your new README file for build instructions, and check out `src/index.js`
and `examples/index.html` to get started - there are instructions in the code. 

## II. Description of your Project's Folder Structure
Once you complete all the steps mentioned above you will have a project with a folder structure like this - 

```bash
├── dev
│   └────── serve.js
├── examples
│   └────── index.html
├── img
│   └────── favicon.png
├── node_modules
│   ├────── modules
├── src
│   ├────── index.js
│   └────── style.less
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── webpack.config.js
```

### dev
Contains code to view and test your application.

### examples
Contains instructions to embed visualisation(s)/demo of your component. You should edit `index.html` in this folder to embed visualisations of your component on the examples page.

### img
Contains a thumbnail for your component which will appear in places such as the browser's tab, address bar, browser history, bookmarks bar, etc. The default thumbnail is BioJS' logo, you should replace it with your component's visualisation.

### node_modules
Contains dependencies required for your component.

### src
### 1. index.js -
Contains the instructions for implementing your component as Web Component. Follow the instructions and edit this file to implement your component as a Web Component.

### 2. style.less - 
Contains instructions for styling your component. Follow the instructions and edit this file to style your component.

### README.md
Contains instructions for writing description of your component. You should edit this to write a tutorial for your component explaining how to use your component, embed visualisations, etc.

Other files are starter files for your project. Generally, you do not need to edit these files.

If you face any issue, feel free to contact us at [Gitter](https://gitter.im/biojs).

## III. Contribute

To contribute, clone this repository, install yeoman and run the code.

Step 1: Clone the repository.

a) Using HTTPS -

```bash
git clone https://github.com/biojs/generator-biojs-webcomponents.git
```

b) Using SSH -

```bash
git clone git@github.com:biojs/generator-biojs-webcomponents.git
```

Step 2: Go to generator's directory

```bash
cd generator-biojs-webcomponents
```

Step 3: Install yeoman

```bash
npm install -g yo
```

Step 4: Symlink the package

```bash
npm link
```

Step 5: Go out of the generator's directory. Run and test the generator locally.

```bash
cd ..
mkdir test-biojs-generator
cd test-biojs-generator
yo biojs-webcomponents
```

Note: If you have installed the generator-biojs-webcomponents globally, there is no need to worry, this method will still work. You do not need to uninstall anything.

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
