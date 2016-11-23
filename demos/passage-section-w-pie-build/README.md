# with pie build

This demo has 2 builds: 

1. a pie build 
2. a second build for all the rest

Both bundles are loaded on to the page and all work together.

## Run

```shell 

# note: need --keepBuildAssets until [this issue](https://github.com/PieLabs/pie-cli/issues/56) is fixed.
pie pack-question --keepBuildAssets --buildExample 
webpack --config additional.bundle.js
```

At this point you'll have the following files: 

* `pie.js`
* `controllers.js`
* `additional.bundle.js`

These are assembled in `index.html`.

```shell
static . # or whatever static file server you want...
# the go to that server..
```

> the `pack-question` build uses a uid to place the controllers within the dom. This uid is logged at the end of the pack command. make sure that this id is set correctly in `index.html`


## deploy

For this you'll need a heroku app you have write/deploy access to...

```shell
./deployment.sh pie-toolbar-demo
```
# Build TODOS

### set up externals

There's alot of duplication in the bundles - stuff which should be moved out using `webpack's` externals option.

