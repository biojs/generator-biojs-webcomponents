# Project todos

This project was generated with the [BioJS WebComponent Generator](https://github.com/biojs/generator-bluegenes-tool), which has
produced the basic files needed for your tool. You'll still need to handle the implementation details, though.

## Todos before this is release-ready:

- [] edit [src/index.js](src/index.js) and add code to initialise your tool
- [] update [examples/index.html](examples/index.html) to show a demo of your tool
- [] add `preview.png` to the root directory of this repo. This image will be used to preview your tool.
- [] update your tool's description in [README.md](README.md)
- [] edit package.json and point to your github repository, something like ```  "repository": {
    "type": "git",
    "url": "git@github.com:yourGitHubUser/someRepo.git"
  },```
- [] add any css styles to [src/style.less](src/style.less)

Run the commands written below in the given order - 
1. `npm run less`
2. `npm run build`
3. `npm start`

Navigate to the `examples` page and check if your component is working.

All those done? Now anybody can use your Web Component by importing the [bundle.js](dist/bundle.js) file in the [dist](dist) directory and [style.css](dist/style.css) if you have a stylesheet.

Brilliant! To push this component to npm, you'll need an [account at npmjs.com](https://www.npmjs.com/). Once you've signed up....

1. Run `npm login` in your terminal to sign in to npm. Add your username and password when prompted.
2. Run `npm publish` - this step will publish your app onto the public npm repository.

That's it. Congratulations - you've published your first BioJS component! The registry is updated once a day, so it might be a few hours or up to a day before your component appears. 
