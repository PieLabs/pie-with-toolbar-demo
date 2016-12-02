# with pie build

## Build 

```shell 
pie pack-question  --keepBuildAssets --log-level silly --questionMarkupFile=pie.html

```

At this point you'll have the following files: 

* `pie.js`
* `controllers.js` - no longer needed, it is now bundled in `additional.entry.js`

These are added to `example.html`.

```shell
static . # or whatever static file server you want...
# the go to that server..
```

## deploy

For this you'll need a heroku app you have write/deploy access to...

Also be sure to build as described above.

```shell
./deployment.sh pie-toolbar-demo
```
# Build TODOS

### set up externals

There's alot of duplication in the bundles - stuff which should be moved out using `webpack's` externals option.

