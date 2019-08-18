#  <%= toolNameHuman %>

FIXME: fill out a description of your tool here! :)

## Component user docs: adding this component to your webpage

Hey! If you'd like to use this component on your webpage, please do the following:

### In the `<head>`, add:
```html
<!-- the library for the webcomponent -->
<script src="dist/bundle.js" type="module"></script>
```

This links to the relevant scripts to define the component and fetch data.

### In the `<body>`

Where you want your WebComponent to appear, add the following:

```html
<<%= toolNameComputer %>
   geneId="BRCA1">
 </<%= toolNameComputer %>>
```

Some notes on usage:

- Download the bundle.js file from dist folder and link it to your index.html file.
- You may use the style.css in dist folder file for styling the component.
- Use the <<%= toolNameComputer %>> element like any other HTML element wherever you want.
- `attribute` must be a valid identifier with a valid `value`.


## Licence
<%= licence %>

## Developer docs

### To set up locally for development

1. Clone the repo
2. `cd <%= toolNameComputer %>` and then `npm install` to install dependencies.

All of the editable source files for css and js are in `src`. To bundle for prod, run the following commands in the given order:

#### CSS

Assuming [less](http://lesscss.org/) is installed globally:

```
npm run less
```

#### JS

Assuming [webpack](https://webpack.js.org/) is installed globally:

##### Single build:
```
npm run build
```

##### Developing:
Run each of these commands in separate terminals:

To rebuild your js every time you save:

```bash
npm run dev
```

To serve your page at [http://localhost:3456](http://localhost:3456):
```bash
npm run server
```
#### Example component
To see a demo component implemented similarly to this component, visit
[biojs-webcomponent-prototype](https://github.com/yochannah/biojs-webcomponent-prototype).
