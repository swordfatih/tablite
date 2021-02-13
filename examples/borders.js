const Table = require('tablite');

const data = [ ['I', 'love'], ['Tab', `lite`]];
const options = {size: 20, header: true, align: 'c'};

// Vertical
let main_data = [['Name', 'Demonstration']];

for(let key of glyphs.keys())
{
    options.border = key;
    main_data.push([key, new Table(data, options).toString()]);
}

console.log(new Table(main_data, {size: 38, align: 'c,l', border: 'none', ratios: 40, gap: 'small'}).toString());

// Horizontal
main_data = [['Name'], ['Demonstration']];

for(let key of glyphs.keys())
{
    options.border = key;
    main_data[0].push(key);
    main_data[1].push(new Table(data, options).toString());
}

const fs = require('fs');
fs.writeFileSync('table.txt', new Table(main_data, {size: 220, ratios: 8, align: 'c', border: 'none'}).toString());
