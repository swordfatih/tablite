// Class representing borders of a table
class Border
{
    constructor(glyphs) // [[lines], [edges], [connections]]
    {
        this.lines = glyphs[0];
        this.edges = glyphs[1];
        this.connections = glyphs[2];
    }

    lines = [];
    edges = [];
    connections = [];
};

// Default glyphs
const glyphs = new Map();
glyphs.set('double-line', [['═', '║'], ['╔', '╗', '╝', '╚'], ['╣', '╩', '╠', '╦', '╬']]);
glyphs.set('single-line', [['─', '│'], ['┌', '┐', '┘', '└'], ['┤', '┴', '├', '┬', '┼']]);
glyphs.set('dot', [['.', '.'], ['.', '.', '.', '.'], ['.', '.', '.', '.', '.']]);
glyphs.set('rounded', [['-', '|'], ['.', '.', '\'', '\''], [':', '\'', ':', '.', '+']]);
glyphs.set('classical', [['-', '|'], ['+', '+', '+', '+'], ['+', '+', '+', '+', '+']]);
glyphs.set('simple', [['=', ' '], [' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ']]);
glyphs.set('modern', [['═', '│'], ['╒', '╕', '╛', '╘'], ['╡', '╧', '╞', '╤', '╪']]);
glyphs.set('inversed', [['─', '║'], ['╓', '╖', '╜', '╙'], ['╢', '╨', '╟', '╥', '╫']]);
glyphs.set('none', [[' ', ' '], [' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ']]);

// Tablite
class Tablite
{
    // Constructor
    constructor (data = [[]], options = []) 
    {
        this.data = data;
        this.options = new Map();

        this.set(options, false);
        this.input(data, true);
    }

    // Set new options
    set(options, generate = true)
    {
        // Default options
        this.options.set('size', '30');
        this.options.set('border', 'single-line');
        this.options.set('header', 'false');
        this.options.set('gap', 'space');
        this.options.set('ratios', 'false');
        this.options.set('align', 'left');
        this.options.set('ansi', 'true');

        // Read options
        if(options !== null)
        {
            for(let option of (typeof options.entries === 'function' ? options.entries() : Object.entries(options))) // Map or Object / Json / Array
            {
                this.options.set(option[0], String(option[1]));
            }
        }

        this.gap = this.options.get('gap'); // Assign gap option, seperate rows with : none / fill / small / space
        this.align = this.options.get('align'); // Assign align option : align your columns, one by one or all in one
        this.ratios = this.options.get('ratios'); // Assign ratio options : set the percentage of your columns
        this.size = parseInt(this.options.get('size')); // Assign size option : set the maximum width of your table
        this.ansi = this.options.get('ansi') === 'true'; // Get ansi option : if you don't want borders adapt to the ANSI commands
        this.header = this.options.get('header') === 'true'; // Assign header boolean : header row or not
            
        if(glyphs.has(this.options.get('border'))) // Detect if specified border exists, else ignore  
        {
            this.border = new Border(glyphs.get(this.options.get('border')));
        }

        if(generate)
        {
            if(this.data && data.length > 0)
            {
                this.input(this.data);
            }
            
            this.generate();
        }
    }

    // Input new data
    input(data, generate = true)
    {
        this.data = data; // Assign new data

        this.line_count = this.data ? this.data.length : 0; // Count of line 
        this.column_count = this.data[0] ? this.data[0].length : 0; // Count of column

        this.column_aligns = new Array(this.column_count).fill('left');
        let aligns = this.align.split(',');
        
        if(aligns.length === 1) // If only one align is specified, align every column with that
        {
            this.column_aligns = new Array(this.column_count).fill(String(aligns[0]).toLowerCase().trim());
        }
        else // Else align each column with specified options, left aligned by default
        {
            for(let i = 0; i < (aligns.length < this.column_count ? aligns.length : this.column_count); ++i)
            {
                this.column_aligns[i] = String(aligns[i]).toLowerCase().trim(); // uniformization
            }
        }

        let minimum_width = this.column_count * 4 + 1;
        this.width = this.size >= minimum_width ? this.size : minimum_width; // Apply width only if it is over the minimum width, else use minimum

        this.borderless_width = this.width - (this.column_count + 1); // Total width without borders
        this.column_widths = new Array(this.column_count).fill(Math.floor(this.borderless_width / this.column_count)); // Default column widths

        if(this.ratios !== 'false')
        {
            const ratios = this.ratios.split(',');

            if(ratios.length > this.column_count) // Too many ratio options is given
            {
                ratios.length = this.column_count;
            }

            const sum = ratios.reduce((a, b) => parseInt(a) + parseInt(b), 0);
            if(sum <= 100) // If sum of ratio isn't over 100
            {
                for(let i = 0; i < ratios.length; ++i)
                {
                    const ratio = parseInt(ratios[i]);
                    const width = Math.floor(ratio / 100 * this.borderless_width);

                    if(width < 3)
                    {
                        throw `Error: ratio ${ratio} for column ${i} is too low.`;
                    }

                    this.column_widths[i] = width;
                }
            }

            if(sum < 100) // If sum ratio is under 100, split the remaining width between not specified columns
            {
                const remaining_width = this.borderless_width - Math.floor(sum / 100 * this.borderless_width);

                let remaining_count = this.column_count - ratios.length;
                let width = Math.floor(remaining_width / remaining_count);

                if(width < 3)
                {
                    throw `Error: ratio sum ${sum} doesn't leave enough space for remaining columns.`;
                }

                for(let i = 0; i < remaining_count; ++i)
                {
                    this.column_widths[ratios.length + i] = width;
                }
            }
        }

        if(generate)
        {
            this.generate();
        }
    }

    // Create an horizontal line
    line(border, left_edge, right_edge, connection, count, widths, line = border.lines[0])
    {
        for(let i = 0; i < count; ++i)
        {
            left_edge += (i !== 0 ? connection : '') + Array(Math.floor(widths[i])).fill(line).join('');
        }

        return left_edge + right_edge;
    }

    // Get a string without ANSI commands
    trim_ansi(str)
    {
        return this.ansi ? str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '') : str;
    }

    // If a string has ANSI commands
    has_ansi(str)
    {
        return str.match(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '') != null && this.ansi;
    }

    // Generate the table
    generate()
    {
        this.table = [];
        this.table.push(this.line(this.border, this.border.edges[0], this.border.edges[1], this.border.connections[3], this.column_count, this.column_widths));

        for(let i = 0; i < this.line_count; ++i)
        {
            const chunks = [];

            // Split a case into chunks
            let max_length = 0;
            for(let j = 0; j < this.column_count; ++j)
            {
                let chunk = [];
                let words = String(this.data[i][j]).split(' ')/*.filter(word => { return word != ''; })*/; // Split and trim

                // Word placement algorithm
                let remaining_length = this.column_widths[j] - 2; // Remaining length on last line, 2 stands for margin
                let new_line = [false, false];
                for(let k = 0; k < words.length; ++k) 
                {
                    if(words[k].indexOf('\n') !== -1) // For \n 
                    {
                        let index = words[k].indexOf('\n');
                        new_line[0] = true;
 
                        /*words[k].substring(index + 1).length !== 0 ?*/ words.splice(k + 1, 0, words[k].substring(index + 1))// : null;
                        words[k] = words[k].substring(0, index);
                    }

                    if(words[k].length < remaining_length && !new_line[1]) // If we can fit the word at last line
                    {
                        chunk.length === 0 ? chunk.push(words[k]) : chunk[chunk.length - 1] += ' ' + words[k]; 
                    }
                    else if(words[k].length > this.column_widths[j] - 2) // If the word will anyway be larger than the column
                    {
                        if(!new_line[1] && remaining_length > 1)
                        {
                            let first = words[k].substring(0, remaining_length - 1);

                            chunk.length === 0 ? chunk.push(first) : (chunk[chunk.length - 1] += ' ' + first);
                        
                            words[k].substring(remaining_length - 1).match(new RegExp(`.{1,${this.column_widths[j] - 2}}`, 'g')).map(word => { chunk.push(word); });
                        }
                        else
                        {
                            words[k].match(new RegExp(`.{1,${this.column_widths[j] - 2}}`, 'g')).map(word => { chunk.push(word);});
                        }
                    }
                    else
                    {
                        chunk.push(words[k]); // Push on a new line
                        new_line[1] = false;
                    }

                    if(new_line[0]) // Push the next word on a new line if new line is activated
                    {
                        new_line = [false, true];
                    }

                    remaining_length = (this.column_widths[j] - 2) - this.trim_ansi(chunk[chunk.length - 1]).length;
                }

                chunks.push(chunk);

                if(chunk.length > max_length) // Set the max chunk length
                {
                    max_length = chunk.length;
                }
            }      

            // Fill the undefined cases with empty string
            for(let j = 0; j < this.column_count; ++j)
            {
                let length = chunks[j].length;
                for(let k = 0; k < max_length - length; ++k)
                {
                    chunks[j].push('');
                }
            }

            // Add the chunks into table
            for(let j = 0; j < max_length; ++j) // row of chunk
            {
                let token = '';

                for(let k = 0; k < chunks.length; ++k) // column of chunk
                {
                    token += (k === 0 ? `${this.border.lines[1]} ` : ' '); 

                    let gap_length = (this.column_widths[k] - 2) - this.trim_ansi(chunks[k][j]).length; // Space count

                    if(this.column_aligns[k].startsWith('c')) // center
                    {
                        token += Array(Math.ceil(gap_length / 2)).fill(` `).join(''); 
                    }
                    else if(this.column_aligns[k].startsWith('r')) // right
                    {
                        token += Array(gap_length).fill(` `).join(''); 
                    }
                    
                    token += chunks[k][j]; 

                    if(this.column_aligns[k].startsWith('c')) // center
                    {
                        token += Array(Math.floor(gap_length / 2)).fill(` `).join(''); 
                    }
                    else if(!this.column_aligns[k].startsWith('r')) // left
                    {
                        token += Array(gap_length).fill(` `).join(''); 
                    }

                    token += ` ${this.border.lines[1]}`;
                }

                this.table.push(token);
            }

            if(i < this.line_count - 1)
            {
                let borders = [];

                if(this.header && i === 0 || this.gap === 'fill')
                {
                    this.table.push(this.line(this.border, this.border.connections[2], this.border.connections[0], this.border.connections[4], this.column_count, this.column_widths));
                }
                else if(this.gap === 'space')
                {
                    this.table.push(this.line(this.border, this.border.lines[1], this.border.lines[1], this.border.lines[1], this.column_count, this.column_widths, ' '));
                }
                else if(this.gap === 'small')
                {
                    this.table.push(this.line(this.border, this.border.connections[2], this.border.connections[0], this.border.lines[1], this.column_count, this.column_widths, ' '));
                }
            }
        }
        
        this.table.push(this.line(this.border, this.border.edges[3], this.border.edges[2], this.border.connections[1], this.column_count, this.column_widths));
        
        return this.table;
    }  
    
    // Split into tables of specified character size
    split(size)
    {
        const splited = [];

        let chunk = [];
        for(let i = 0; i < this.table.length; ++i)
        {
            if(chunk.length * this.table[0].length + this.table[i].length < size)
            {
                chunk.push(this.table[i]);
            }
            else
            {
                splited.push(chunk);
                chunk = [this.table[i]];
            }
        }

        if(chunk.length !== 0)
        {
            splited.push(chunk);
        }

        return splited;
    }

    // Convert table to string
    toString()
    {
        return this.table.join('\n');
    }
}

module.exports = Tablite;