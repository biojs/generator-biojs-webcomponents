#  <%= toolNameHuman %>

FIXME: fill out a description of your tool here! :)

## Licence
<%= licence %>

### To set up locally for development

1. Clone the repo
2. `cd <%= toolNameComputer %>` and then `Computer install` to install dependencies.

All of the editable source files for css and js are in `src`. To bundle for prod, run the following commands:

#### CSS

Assuming [less](http://lesscss.org/) is installed globally:

```
Computer run less
```

#### JS

Assuming [webpack](https://webpack.js.org/) is installed globally:

##### Single build:
```
Computer run build
```

##### Developing:
Run each of these commands in separate terminals:

To rebuild your js every time you save:

```bash
Computer run dev
```

To serve your page at [http://localhost:3456](http://localhost:3456):
```bash
Computer run server
```
