const {src, dest, parallel, watch} = require('gulp');
const fs = require('fs');

const files = {
    hbs: ['src/*.hbs'],
    partials: ['src/partials/*.hbs'],
    css: ['src/assets/css/*.css'],
    fonts: ['src/assets/fonts/*'],
    js: ['src/assets/js/*.js'],
    misc: ['package.json']
}

const hbs = () => src(files.hbs).pipe(dest('dist/'))
const partials = () => src(files.partials).pipe(dest('dist/partials'))
const css = () => src(files.css).pipe(dest('dist/assets/css'))
const js = () => src(files.js).pipe(dest('dist/assets/js'))
const fonts = () => src(files.fonts).pipe(dest('dist/assets/fonts'))
const misc = () => src(files.misc).pipe(dest('dist/'))

const cssWatcher = () => watch(files.css, css)
const hbsWatcher = () => watch(files.hbs, hbs)
const partialsWatcher = () => watch(files.partials, partials)
const jsWatcher = () => watch(files.js, js)
const fontsWatcher = () => watch(files.fonts, fonts)
const miscWatcher = () => watch(files.misc, misc)

function clean(cb) {
    if (!fs.existsSync('dist')) {
        cb()
        return
    }
    fs.rmSync('dist', {recursive: true})
    cb()
}

exports.build = parallel(hbs, partials, css, js, misc, fonts)
exports.dev = parallel(hbs, partials, css, js, misc, fonts,
    cssWatcher, hbsWatcher, partialsWatcher, jsWatcher, miscWatcher, fontsWatcher)
exports.clean = clean
