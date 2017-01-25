# pie-with-toolbar-demo

A demo app that uses PIE interactions and Custom Elements to demonstrate a broad set of functionality in an item that can be packaged by the PIE packaging system and run with the PIE player.

A number of Custom Elements are defined that provide tools such as calculator that are available to a user through a toolbar in the UI. This is accomodated by having these Custom Elements emit a `ToolbarContributionEvent` which is handled by the `Section` custom element, to render tool actions for 


```
----------------------------
| toolbar                   |
----------------------------
|           | section       |
|  passage  | - - - - - - - | 
|           |   interaction |      
|           | - - - - - - - |
|           | section       | 
|           | - - - - - - - |
|           |  interaction  | 
|           | - - - - - - - |
--------------------------
```

### Parts of the demo 
* `toolbar` - a main toolbar
* `passage` - some content on which the the assessment is based
* `section` - a section of the view - can show a toolbar to launch tools
* `pie interaction` - a [pie](https://github.com/PieLabs/pie-docs) question

## Running 

```shell
npm install
cd demo
pie serve #will boot a serve with live reload
```
> Note: If you have issues re-running `pie serve` try running a `pie clean` and then `pie serve` again. There's is an outstanding issue w/ running certain commands with a pre-existing `node_modules` dir.

# Notes

In this demo some depencies used by the Custom Elements and tools are declared for the whole project in the package.json and imported, for example, as `import interact from 'interact.js'` in `mask.jsx`. In practice, to create re-usable Elements/Tools you should define these tools as independent npm packages and define their dependencies within those packages. See the [pie documentation](https://github.com/PieLabs/pie-docs)

