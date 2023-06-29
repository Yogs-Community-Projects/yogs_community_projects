import * as fs from 'fs'

if (fs.existsSync('./dist/index.html')) {
  fs.writeFileSync(
    './dist/index.html',
    new Buffer(fs.readFileSync('./dist/index.html').toString().replaceAll('/assets/', 'assets/')),
  )
}

if (fs.existsSync('./dist/mobile.html')) {
  fs.writeFileSync(
    './dist/mobile.html',
    new Buffer(fs.readFileSync('./dist/mobile.html').toString().replaceAll('/assets/', 'assets/')),
  )
}

if (fs.existsSync('./dist/config.html')) {
  fs.writeFileSync(
    './dist/config.html',
    new Buffer(fs.readFileSync('./dist/config.html').toString().replaceAll('/assets/', 'assets/')),
  )
}
// fs.writeFileSync('./dist/mobile.html', new Buffer(content.replace('DESKTOP', 'MOBILE')))
