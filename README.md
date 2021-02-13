<img src="https://i.ibb.co/wB7JP2X/logo-transparent.png" width="400" align="right"/>

# tablite

> Turn your data into a modern text table.

<img src="https://i.ibb.co/8Dd11hb/example-screen.png" width="400"/>

***

### Table of Contents
* [Installation](#%EF%B8%8F-installation)
* [Example](#-example)
* [Documentation](#-documentation)
    * [Methods](#methods)
    * [Options](#options)
    * [Borders](#borders)
    * [Gaps](#gaps)
    * [New line character and template literals](#new-line-character-and-template-literals)
    * [ANSI](#ansi)
* [License](#-license)

***

### ☁️ Installation
`npm install tablite --save`

### 📋 Example
> Check out the [examples folder](https://github.com/swordfatih/tablite/tree/main/examples) for more.
```js
const Table = require('tablite');

let options = {size: 100, header: true, ratios: [10, 10], align: 'l,c'};

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

### 📝 Documentation
> Every table used in this documentation was generated with **tablite** itself.

#### Methods
Here are a list of the simple methods to help you.
```js
╒═════════════╤═════════════════════════════════════════════════════════════════════╤════════════════════════════════╕
│    Method   │ Documentation                                                       │ Usage example                  │
╞═════════════╪═════════════════════════════════════════════════════════════════════╪════════════════════════════════╡
│ constructor │ Constructor of the table. Generates an empty table by default.      │ console.log(new Table(data,    │
│             │ Takes two optional parameters: data and options.                    │ options).toString());          │
│             │ You can directly build your table with these.                       │                                │
╞═════════════╪═════════════════════════════════════════════════════════════════════╪════════════════════════════════╡
│     set     │ Set new options. Takes your option structure as parameter.          │ let table = new Table();       │
│             │ Optional: you can disable regeneration with the second parameter.   │ table.set(options);            │
│             │ (see options section for more informations)                         │                                │
╞═════════════╪═════════════════════════════════════════════════════════════════════╪════════════════════════════════╡
│    input    │ Set new data. Takes your data structure as parameter.               │ let table = new Table();       │
│             │ Optional: you can disable regeneration with the second parameter.   │ table.input(data);             │
│             │ (see options section for more informations)                         │                                │
╞═════════════╪═════════════════════════════════════════════════════════════════════╪════════════════════════════════╡
│   generate  │ Regenerate your table. Don't forget to set options and input data   │ table.generate();              │
│             │ first.                                                              │                                │
│             │ Returns the generated table array. (see toString() for string       │                                │
│             │ version)                                                            │                                │
╞═════════════╪═════════════════════════════════════════════════════════════════════╪════════════════════════════════╡
│    split    │ Split your table into different arrays of a specified maximum       │ console.log(table.split(50)[0  │
│             │ character size.                                                     │ ].join('\n'));                 │
╞═════════════╪═════════════════════════════════════════════════════════════════════╪════════════════════════════════╡
│   toString  │ Convert the table into a printable string.                          │ console.log(table.toString()); │
╘═════════════╧═════════════════════════════════════════════════════════════════════╧════════════════════════════════╛
```

#### Options
You can give multiple options to customize your table. 

Here are several ways to structure your options, they would all give the same output as the previous example code:
```js
╒══════════╤═════════════════════════════════════════════════════════════════════════════════════════════════╕
│   Type   │ Usage example                                                                                   │
╞══════════╪═════════════════════════════════════════════════════════════════════════════════════════════════╡
│  Object  │ let options = new Object();                                                                     │
│          │ options.size = 100;                                                                             │
│          │ options.header = true;                                                                          │
│          │ options.ratios = [10, 10];                                                                      │
│          │ options.align = 'l,c';                                                                          │
╞══════════╪═════════════════════════════════════════════════════════════════════════════════════════════════╡
│   JSON   │ let options = JSON.parse('{"size": 100, "header": true, "ratios": [10, 10], "align": "l,c"}');  │
╞══════════╪═════════════════════════════════════════════════════════════════════════════════════════════════╡
│    Map   │ let options = new Map();                                                                        │
│          │ options.set('size', 100);                                                                       │
│          │ options.set('header', true);                                                                    │
│          │ options.set('ratios', [10, 10]);                                                                │
│          │ options.set('align', 'l,c');                                                                    │
╞══════════╪═════════════════════════════════════════════════════════════════════════════════════════════════╡
│   Array  │ let options = {size: 100, header: true, ratios: [10, 10], align: 'l,c'};                        │
╘══════════╧═════════════════════════════════════════════════════════════════════════════════════════════════╛
```

Here is a list of the available options and their documentation:
```js
╒════════════╤═════════════════════════════════════════════════════════════════════════════════╤═══════════════════════════════╕
│   Option   │ Documentation                                                                   │ Data                          │
╞════════════╪═════════════════════════════════════════════════════════════════════════════════╪═══════════════════════════════╡
│    size    │ Specify the maximum character count of the rows.                                │ Integer (might be given as a  │
│            │ The real size might be 1 character less, depends on column count's multiples.   │ string)                       │
╞════════════╪═════════════════════════════════════════════════════════════════════════════════╪═══════════════════════════════╡
│   header   │ Toggle the header line.                                                         │ Boolean                       │
│            │ Useless if gaps are filled (see gap option).                                    │                               │
╞════════════╪═════════════════════════════════════════════════════════════════════════════════╪═══════════════════════════════╡
│   border   │ Specify the border you like, single-line is used by default.                    │ String containing border name │
│            │ (See borders section for available borders)                                     │                               │
╞════════════╪═════════════════════════════════════════════════════════════════════════════════╪═══════════════════════════════╡
│     gap    │ Specify the separation between rows.                                            │ String containg separation    │
│            │ (See gaps section for available separations)                                    │ name                          │
╞════════════╪═════════════════════════════════════════════════════════════════════════════════╪═══════════════════════════════╡
│    align   │ Specify columns' aligns. If only one align is given, it is applied to every     │ Array of strings or one       │
│            │ columns.                                                                        │ string separated by commas    │
╞════════════╪═════════════════════════════════════════════════════════════════════════════════╪═══════════════════════════════╡
│   ratios   │ Specify columns' ratio. For example: [10,10] will apply 10% to the first        │ Array of percentages or one   │
│            │ column, 10% to the second and it will split the remaining 80% between remaining │ string separated by commas or │
│            │ columns if they exist.                                                          │ an integer as percentage      │
│            │ Otherwise they will all be added to the last column.                            │                               │
╞════════════╪═════════════════════════════════════════════════════════════════════════════════╪═══════════════════════════════╡
│    ansi    │ The table adapt a row's width when it contains an ANSI command.                 │ Boolean                       │
│            │ Disable this option if your terminal doesn't recognize ANSI commands.           │                               │
╘════════════╧═════════════════════════════════════════════════════════════════════════════════╧═══════════════════════════════╛
```

#### Borders
> Wonder how the following table-ception was generated using **tablite**? Check out the [examples folder](https://github.com/swordfatih/tablite/tree/main/examples).
```
       Name            double-line           single-line               dot                 rounded              classical               simple                modern               inversed                none         
                                                                                                                                                                                                                        
   Demonstration   ╔════════╦════════╗   ┌────────┬────────┐   ...................   .--------.--------.   +--------+--------+    ======== ========    ╒════════╤════════╕   ╓────────╥────────╖                        
                   ║    I   ║  love  ║   │    I   │  love  │   .    I   .  love  .   |    I   |  love  |   |    I   |  love  |        I      love      │    I   │  love  │   ║    I   ║  love  ║        I      love     
                   ╠════════╬════════╣   ├────────┼────────┤   ...................   :--------+--------:   +--------+--------+    ======== ========    ╞════════╪════════╡   ╟────────╫────────╢                        
                   ║   Tab  ║  lite  ║   │   Tab  │  lite  │   .   Tab  .  lite  .   |   Tab  |  lite  |   |   Tab  |  lite  |       Tab     lite      │   Tab  │  lite  │   ║   Tab  ║  lite  ║       Tab     lite     
                   ╚════════╩════════╝   └────────┴────────┘   ...................   '--------'--------'   +--------+--------+    ======== ========    ╘════════╧════════╛   ╙────────╨────────╜                                                                                                                                                                                                                                   
```

#### Gaps
Gaps are the separation lines between rows. Here is a list of the available ones:
```
        Name                 space                    fill                     small                    none

   Demonstration      ┌────────┬────────┐      ┌────────┬────────┐      ┌────────┬────────┐      ┌────────┬────────┐
                      │    I   │  love  │      │    I   │  love  │      │    I   │  love  │      │    I   │  love  │
                      │        │        │      ├────────┼────────┤      ├        │        ┤      │   Tab  │  lite  │
                      │   Tab  │  lite  │      │   Tab  │  lite  │      │   Tab  │  lite  │      └────────┴────────┘
                      └────────┴────────┘      └────────┴────────┘      └────────┴────────┘
```

#### New line character and template literals
You can use the `\n` character wherever you like in your data. It works. You can also use the template literals (\`...\`) for your complex cells.

```js
const Table = require('tablite');

const data = [ ['I', 'love'], 
['Tablite', `Here is a very
complex cell that will print 
on several lines..`]];

console.log(new Table(data).toString());
```

#### ANSI
ANSI commands such as colors are also supported: the table's size won't be changed. Howewer, I can't predict if every ANSI commands work with tablite.
Just keep in mind that if you use color commands in your table, make sure there are on a full row; otherwise colors will spread on the borders.

### 📜 License
[MIT](https://github.com/swordfatih/tablite/blob/main/LICENSE) © [swordfatih](https://github.com/swordfatih/)
