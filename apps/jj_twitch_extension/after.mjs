import * as fs from 'fs'

let content = fs.readFileSync('./dist/index.html').toString()
content = content.replaceAll('/assets/', 'assets/')
fs.writeFileSync('./dist/index.html', new Buffer(content))
