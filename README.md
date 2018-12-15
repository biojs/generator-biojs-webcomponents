# generator-biojs-webcomponents [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
Generates the scaffold for a BioJS component automatically so you don't have to do it yourself. 

### What this tool currently does

This tool specifically designed with re-packaging existing components in mind, so you can upgrade to BioJS 3 component style without having to re-write your component.

### To-do / roadmap. 

See [issues](issues) for more details - we still need the following: 

1. Scaffolder for _new_ browser tools (i.e. not just a wrapper for older tools)
2. Scaffolder for command line tools. 

## Getting started.

First, install [Yeoman](http://yeoman.io) and generator-biojs-webcomponents using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)) - if you need to manage multiple versions of node also consider [nvm](https://github.com/creationix/nvm).

Once node is installed, run this in your terminal.

Note that below you can change my-new-component to the folder name of your choice. 

```bash
mkdir my-new-component 
cd my-new-component
npm install -g yo @biojs/generator-biojs-webcomponents
```

Then generate your new project:

```bash
yo @biojs/biojs-webcomponents
```

This will walk you through the process of setting up your component and generate boilerplate files for you. 
Once it's complete, look at your new README file for build instructions, and check out `src/index.js`
and `examples/index.html` to get started - there are instructions in the code. 


## License

MIT © [Yo Yehudi](http://www.yo-yehudi.com)

[npm-image]: https://badge.fury.io/js/%40biojs%2Fgenerator-biojs-webcomponents.svg
[npm-url]: https://npmjs.org/package/%40biojs%2Fgenerator-biojs-webcomponents
[travis-image]: https://travis-ci.org/biojs/generator-biojs-webcomponents.svg?branch=master
[travis-url]: https://travis-ci.org/biojs/generator-biojs-webcomponents
[daviddm-image]: https://david-dm.org/biojs/generator-biojs-webcomponents.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/biojs/generator-biojs-webcomponents
