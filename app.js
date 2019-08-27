var fs = require('fs');
var colors = require('colors')

function convertLine(line) {
    line = line.replace('<xsAppData>', '').replace('</xsAppData>', '').replace(/\n/g, " ")
    console.log(colors.red(line))

    const lineArray = Array.from(line)
    const formatedLineArray = lineArray.filter(l => isChar(l)).join('')
    
    function isChar(str) {
        return str.length === 1 && str.match(/[a-z0-9\#\-\`\.\;\?\/\=\s]/i);
    }

    console.log(colors.green(formatedLineArray))
    return formatedLineArray
}

function convert(filename) {
    fs.readFile(filename, 'ascii', function(err, contents) {
        const tokenPatt = /\<xsAppData\>(.*?)\<\/xsAppData\>/gms
        const stack = []
        let m

        do {
                m = tokenPatt.exec(contents);
                tokenPatt.lastIndex = -1
                if (m) {
                    let line = convertLine(m[0])
                    const patt = new RegExp(`${m[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`, 'gm')
                    contents = contents.replace(patt, '')
                    patt.lastIndex = -1
                    stack.push(convertLine(m[0]))
                }
            } while (m)
            // console.log('stack :', stack);
    })

}

convert('reed-sample/lane-a-cancel-order')
// convert('reed-sample/lane-a-cancel')
// convert('reed-sample/lane-a-coupon-discount')
// convert('reed-sample/lane-a-modification')
// convert('reed-sample/lane-a-removal')