<img src="https://i.ibb.co/wB7JP2X/logo-transparent.png" width="400" align="right"/>

# tablite

> Turn your data into a modern text table.

<img src="https://i.ibb.co/8Dd11hb/example-screen.png" width="400"/>

### ☁️ Installation
`npm install tablite --save`

### 📋 Example
```js
const Table = require('tablite');

let options = {size: 100, header: true, ratios:[10, 10], align:'l,c'};

let data = [
    ['Color', 'hex', 'Description'],
    ['Green', '#008000', `Seeing the colour \u001b[32mgreen\u001b[0m has been linked to more creative thinking—so greens are good options for home offices.`],
    ['Violet', '#0000FF', `People link a greyish violet with sophistication, so it can be a good selection for places where you’re trying to make the “right” impression.`],
    ['Blue', '#EE82EE', `People are more likely to tell you that blue is their favourite colour than any other shade.\n That makes it a safe choice.`]];

console.log(new Table(data, options).toString());
```


```
┌─────────┬─────────┬─────────────────────────────────────────────────────────────────────────────┐
│ Color   │   hex   │ Description                                                                 │
├─────────┼─────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Green   │ #008000 │ Seeing the colour green has been linked to more creative thinking—so greens │
│         │         │ are good options for home offices.                                          │
│         │         │                                                                             │
│ Violet  │ #0000FF │ People link a greyish violet with sophistication, so it can be a good       │
│         │         │ selection for places where you’re trying to make the “right” impression.    │
│         │         │                                                                             │
│ Blue    │ #EE82EE │ People are more likely to tell you that blue is their favourite colour than │
│         │         │ any other shade.                                                            │
│         │         │ That makes it a safe choice.                                                │
└─────────┴─────────┴─────────────────────────────────────────────────────────────────────────────┘
```
