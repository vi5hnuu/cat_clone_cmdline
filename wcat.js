#!/usr/bin/env node

const fs = require('fs')
const utility = require('./utility')


const input = process.argv.slice(2)
const validOptions = utility.validOptions
const { optionsArr, filesPathArr } = utility.seperateOptionsAndFiles(input)
const option = optionsArr.join('')

if (optionsArr.length > 0 && !utility.contains(option, validOptions)) {
    console.log('Invalid options.');
    console.log(utility.usage);
    return
}

for (const filePath of filesPathArr) {
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        switch (option) {
            case 'n': console.log(utility.numberLinesOf(content)); break;
            case 's': console.log(utility.removeGap(content)); break
            case 'b': console.log(utility.numberLinesOf(content, false)); break;
            case 'ns':
            case 'sn':
            case 'sb':
            case 'bs': console.log(utility.numberLinesOf(utility.removeGap(content))); break
            default: console.log(content);
        }
    } else {
        console.log('File not exist or File is not a readable.');
    }
}
