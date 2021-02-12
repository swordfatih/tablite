<img src="https://i.ibb.co/wB7JP2X/logo-transparent.png" width="400" align="right"/>

# tablite

> Turn your data into a modern text table.

### ☁️ Installation
`npm install tablite --save`

### 📋 Example
```js
let options = {size: 100, header: true, ratios:[10,10]};

let data = [
    ['Color', 'hex', 'Description'],
    ['Green', '#008000', `Seeing the colour green has been linked to more creative thinking—so greens are good options for home offices, art studios, etc.`],
    ['Violet', '#0000FF', `People link a greyish violet with sophistication, so it can be a good selection for places where you’re trying to make the “right” impression.`],
    ['Blue', '#EE82EE', `People are more likely to tell you that blue is their favourite colour than any other shade. That makes it a safe choice.`]];

console.log(new Table(data, options).toString());
```

```
┌─────────┬─────────┬─────────────────────────────────────────────────────────────────────────────┐
│ Color   │ hex     │ Description                                                                 │
├─────────┼─────────┼─────────────────────────────────────────────────────────────────────────────┤
│ Green   │ #008000 │ The colour green has been linked to creativity.                             │
│         │         │                                                                             │
│ Violet  │ #0000FF │ People link a greyish violet with sophistication, so it can be a good       │
│         │         │ selection for places where you’re trying to make the “right” impression.    │
│         │         │                                                                             │
│ Blue    │ #EE82EE │ People are more likely to tell you that blue is their favourite colour than │
│         │         │ any other shade. That makes it a safe choice.                               │
└─────────┴─────────┴─────────────────────────────────────────────────────────────────────────────┘
```
