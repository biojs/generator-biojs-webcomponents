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

- `geneId` value must must be an identifier for a gene. You can replace it
with your favourite gene id instead!


## Licence
<%= licence %>

## Developer docs

### To set up locally for development

1. Clone the repo
2. `cd <%= toolNameComputer %>` and then `npm install` to install dependencies.

All of the editable source files for css and js are in `src`. To bundle for prod, run the following commands:

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
#### Example comonent
To see a demo component implemented similarly to this component, visit
[biojs-webcomponent-prototype](https://github.com/yochannah/biojs-webcomponent-prototype).
