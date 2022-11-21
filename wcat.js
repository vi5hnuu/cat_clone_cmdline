#!/usr/bin/env node

const fs = require('fs')
const utlity = require('./utility')


const input = process.argv.slice(2)
const validOptions = utlity.validOptions
const { optionsArr, filesPathArr } = utlity.seperateOptionsAndFiles(input)
const option = optionsArr.join('')

if (optionsArr.length > 0 && !contains(option, validOptions)) {
    console.log('Invalid options.');
    console.log(utlity.usage);
    return
}

for (const filePath of filesPathArr) {
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        switch (option) {
            case 'n': console.log(utlity.numberLinesOf(content)); break;
            case 's': console.log(utlity.removeGap(content)); break
            case 'b': console.log(utlity.numberLinesOf(content, false)); break;
            case 'ns':
            case 'sn':
            case 'sb':
            case 'bs': console.log(utlity.numberLinesOf(removeGap(content))); break
            default: console.log(content);
        }
    } else {
        console.log('File not exist or File is not a readable.');
    }
}
