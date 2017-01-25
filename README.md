# pie-with-toolbar-demo

A demo app that uses pies and toolbars.


```
--------------------------
| toolbar                |
--------------------------
|           | section    |
|  passage  | - - - - - -| 
|           |   pie      | 
|           | - - - - - -|
|           | section    | 
|           | - - - - - -|
|           |  pie       | 
|           | - - - - - -|
--------------------------
```

### Parts of the demo 
* `toolbar` - a main toolbar
* `passage` - some content on which the the assessment is based
* `section` - a section of the assessment - can have tools
* `pie` - a [pie](https://github.com/PieLabs/pie-docs)

## Running 

```shell
npm install
cd demo
pie serve #will boot a serve with live reload
```

## Notes

The src uses a combination of vanilla custom elements and some that render react internally. The decisions that drove this were just based on getting a demo up and running quickly. A developer may choose to use no framework or something else.