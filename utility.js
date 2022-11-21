const utility = {
    usage: `
    Valid options :
        -n          : number each line.
        -s          : remove leading, trailing, empty gap between paragraphs.
        -b          : number line with content(do not remove empty gap).
        -ns | -n -s : number line with content(remove leading, trailing, empty space b/w paragraphs)
        -sn | -s -n : same as above
        -sb | -s -b : same as above
        -bs | -b -s : same as above
`,
    seperateOptionsAndFiles,
    validOptions: ['n', 's', 'b', 'ns', 'sn', 'sb', 'bs'],
    contains,
    numberLinesOf,
    removeGap
}

function seperateOptionsAndFiles(arr) {
    const optionsArr = []
    const filesPathArr = []
    for (const arg of arr) {
        if (arg[0] == '-') {
            optionsArr.push(arg.slice(1));
        } else {
            filesPathArr.push(arg)
        }
    }
    return { optionsArr, filesPathArr }
}

function numberLinesOf(content, numberGap = true) {
    let lines = content.split('\r\n')
    lines = lines.map((line, index) => {
        if (line.trim() || numberGap)
            return `${index + 1} : ${line}`
        else {
            return line
        }
    }).join('\r\n')
    return lines
}
function removeGap(content) {
    let lines = content.trim().split('\r\n')
    lines = lines.filter((line, index) => {
        const lineTemp = line.trim();
        if (lineTemp || (!lineTemp && lines[index - 1].trim())) {
            return true;
        } else {
            return false;
        }
    })
    return lines.join('\r\n')
}
function contains(key, keys) {
    for (k of keys) {
        if (k === key) {
            return true;
        }
    }
    return false;
}

module.exports = utility