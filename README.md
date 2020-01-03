# generator-biojs-webcomponents [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
Generates the scaffold for a BioJS component automatically so you don't have to do it yourself.

This guide is for using the generator to make new components and upgrade existing ones. See [Section I](#i-getting-started) for getting started with the generator and installing it and [Section II](#ii-description-of-your-projects-folder-structure) for description of your project's directory after running the generator. Once you install the generator and run it, you will be asked some questions, you can read more about them in [Section III](#iii-workflow-and-questions).

For contributing to this project, see the [Contribution guide](CONTRIBUTING.md). Please read the [code of conduct](CODE_OF_CONDUCT.md) before contributing.

### What this tool currently does

This tool is specifically designed keeping in mind the idea of re-packaging existing components, so you can upgrade your components to BioJS 3 component style without having to re-write your component.

## I. Getting started.

Step 0: Install [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) (npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer).

Note: If you need to manage multiple versions of node also consider [nvm](https://github.com/creationix/nvm).

Step 1: Install [Yeoman](http://yeoman.io).

```
npm install -g yo
```

Step 2a: Install [generator-biojs-webcomponents](https://www.npmjs.com/package/generator-biojs-webcomponents).

```
npm install -g yo generator-biojs-webcomponents
```

Step 2b: Generate your new project.

```
i) yo biojs-webcomponents 
```
This will make a **new directory** named `web-component` in the **current directory**. The `web-component` directory will be your **project directory**. If there is already a directory with the name `web-component`, the generator will not make a new one, rather **the existing one will be your project directory**.

   OR

```
ii) yo biojs-webcomponents .
```
This will run the generator in the **current directory**.

   OR 
        
```
iii) yo biojs-webcomponents /anyPath/yourNewProjectDir
```
This will run the generator in a new directory named `yourNewProjectDir` (you can choose any other name), the new directory will be created at the **path you specified**. If there is already a directory with the same name as you provided, the generator will not make a new one, rather **the existing one will be your project directory**.



After running this, you will be asked some questions about the details of your project, after which the required dependencies will be automatically installed. You can read more about the whole workflow and the questions asked [here](#iii-workflow-and-questions).

Once it's complete, look at your new README file for build instructions, and check out `src/index.js`
and `examples/index.html` to get started - there are instructions in the code. 

## II. Description of your Project's Folder Structure
Once you complete all the steps mentioned above you will have a project with a folder structure like this - 

```
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

## III. Workflow and Questions

After running ```yo biojs-webcomponents``` in your terminal, you will be asked -

```
? Press Enter key to get going!

? What do you want to do today?
> Upgrade an existing component to a Web Component
  Make a new Web Component
```

Based on your choice, you will be asked different questions. Read more -

### Upgrade an existing component to a Web Component

A) Import the build file of your existing component into the project's directory. 

1) Install the component from npm [**Recommended - Fastest way**]
2) You can import the build file from your local computer.
3) If you do not have the build file in your computer, you can import it from your component's package on npm.

```
? We need the build file (generally index.js, main.js or componentName.js) for this,
  import it using one of the options - 
  1) Install component from npm package (Recommended - fastest way)
  2) Tell us the path of the file on your local machine and we will import it in the project.
  3) Tell us the npm package name, version, etc. and we will import it.
```

B1) Install component from npm package -

You have to enter the package name (case sensitive) of your component, the generator will show you the description of your package and ask whether the description shown is correct or not. 

```
Enter the package name (case sensitive).
Press enter if the package description shown is correct.
```

If the description shown is incorrect, press ```N``` and you will go back to step A where you can choose to enter the package name again or import the file from local storage.

```
? What do you want to do? 
  1) Enter package name again to install component from npm package. (Recommended - fastest way)
  2) Import the file locally from your computer.
  3) Enter package name, version, build file URL to download the build file.
```

If the description shown is correct, press ```Enter``` or ```Y```. You will be asked about the version of the package you want to import from. You can press ```Enter``` if you want to import from the latest version or you can enter the version you need. If you enter a version which does not exist, the generator will ask for version again.

```
Great! We will import the latest version of your file from the npm package, if you don't want this,
enter the version.
```

Your component will be installed. Next, the questions in [this](#make-a-new-web-component) section will be asked.

B2) Import build file from your local storage -

Firstly, the generator will ask you about the build directory - the build file will be imported in this directory which will be created in your project directory. You can press ```Enter``` if you want the default name - ```component-dist``` or enter a name of your choice.

If a directory with the same name already exists in your project directory, you can either enter a new name for your directory or press ```o```/```O``` if you want to overwrite the content of existing directory.

```
The build file will be imported in a separate directory in the project's root.
Enter the name of this directory or press Enter if you like to go with default.
(component-dist)
```

Enter the path of your build file.

```
Please enter the path of the build file.
```

Your build file will be imported in the build directory. Next, the questions in [this](#make-a-new-web-component) section will be asked.

B3) Import build file from your compnent's package on npm - 

You have to enter the package name (case sensitive) of your component, the generator will show you the description of your package and ask whether the description shown is correct or not. 

```
Enter the package name (case sensitive).
Press enter if the package description shown is correct.
```

If the description shown is incorrect, press ```N``` and you will go back to step A where you can choose to enter the package name again or import the file from local storage.

```
? What do you want to do? 
  1) Enter package name again to install component from npm package. (Recommended - fastest way)
  2) Import the file locally from your computer.
  3) Enter package name, version, build file URL to download the build file.
```

If the description shown is correct, press ```Enter``` or ```Y```. You will be asked about the version of the package you want to import from. You can press ```Enter``` if you want to import from the latest version or you can enter the version you need. If you enter a version which does not exist, the generator will ask for version again.

```
Great! We will import the latest version of your file from the npm package,
if you don't want this, enter the version.
```

Once you enter a valid version and press ```Enter```, the generator will ask you about the build directory - the build file will be imported in this directory which will be created in your project directory. You can press ```Enter``` if you want the default name - ```component-dist``` or enter a name of your choice.

If a directory with the same name already exists in your project directory, you can either enter a new name for your directory or press ```o```/```O``` if you want to overwrite the content of existing directory.

```
The build file will be imported in a separate directory in the project's root.
Enter the name of this directory or press Enter if you like to go with default.
(component-dist)
```

Once you have your build directory ready, generator will show you a URL, which containts the component's directory. You can find the build file in the root folder or a separate folder named build, dist, etc. The build file is generally named index.js, package_name.js, index.min.js or package_name.min.js, etc. Copy the URL of the build file and paste it in the generator.

```
This URL - https://www.jsdelivr.com/package/npm/<your-package-name>?version=<your-package-version>
contains the directory of the package, please find the build file (generally in the dist or build 
folder) and paste the link here, we will download it for you. 
```

The generator will download the build file in the build directory. Next, the questions in [this](#make-a-new-web-component) section will be asked.

C) After successfully installing the component/importing the build file, you will be asked the same questions (questions A and B in the next section) about your component as asked while [making a new one](#make-a-new-web-component).

### Make a new Web Component

A) Enter computer package name. This should contain only small alphabets and hyphen ( - ) between the words. You can't use CAPITAL letters, number, space, any other special character(s) and hyphen at beginning or end.

```
Computer package name? This is a computer name with NO capital letters or special 
characters apart from the hyphen ( - ) .
```

B) Enter human name for the project. This can only contain letters (small and capital) and spaces, no other special characters or numbers.

```
Thanks! Now, give me a human name for the project with only letters and NO special
characters apart from the whitespace (space). e.g. \"Genome Browser\"
```

## License

MIT © [Yo Yehudi](http://www.yo-yehudi.com)

[npm-image]: https://badge.fury.io/js/%40biojs%2Fgenerator-biojs-webcomponents.svg
[npm-url]: https://npmjs.org/package/%40biojs%2Fgenerator-biojs-webcomponents
[travis-image]: https://travis-ci.org/biojs/generator-biojs-webcomponents.svg?branch=master
[travis-url]: https://travis-ci.org/biojs/generator-biojs-webcomponents
[daviddm-image]: https://david-dm.org/biojs/generator-biojs-webcomponents.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/biojs/generator-biojs-webcomponents
