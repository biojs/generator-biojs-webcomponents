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
