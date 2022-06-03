const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const fileinclude = require("gulp-file-include");
const htmlhint = require("gulp-htmlhint");
const htmlbeautify = require("gulp-html-beautify");

// В слежении: Запуск локального сервера
function browsersync() {
    browserSync.init({
        server: {
            baseDir: "../dist/",
        },
    });
}

// В слежении: scss + autprefix > css
function styles() {
    return src("../app/scss/style.scss")
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(concat("style.min.css"))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 10 version"],
                grid: true,
            })
        )
        .pipe(dest("../dist/assets/css"))
        .pipe(browserSync.stream());
}

function stylesVendor() {
    return src("../app/assets/library/**/*.css")
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(concat("vendor.min.css"))
        .pipe(dest("../dist/assets/library"))
        .pipe(browserSync.stream());
}

function htmlRun() {
    const options = {
        indent_size: 2,
        inline: "body",
    };
    return src("../app/*.html")
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
            })
        )
        .pipe(htmlhint())
        .pipe(htmlbeautify(options))
        .pipe(dest("../dist"));
}

// В слежении: js > js.min
function scripts() {
    return src(["../app/assets/js/main.js"]).pipe(concat("main.min.js")).pipe(uglify()).pipe(dest("../dist/assets/js")).pipe(browserSync.stream());
}
function scriptsVendor() {
    return src(["../app/assets/library/**/*"]).pipe(concat("vendor.min.js")).pipe(uglify()).pipe(dest("../dist/assets/library")).pipe(browserSync.stream());
}

// В слежении: Оптимизация картинок
function images() {
    return src("../app/assets/img/**/*")
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(dest("../dist/assets/img"));
}

// В Билде: Удаляем старую папку dist
function cleanDist() {
    return del("../dist");
}

// В Билде: Перемещаем файлы в папку dist
function buildFonts() {
    return src(["../app/assets/fonts/*"]).pipe(dest("../dist/assets/fonts/"));
}

function buildPhp() {
    return src(["../app/assets/php/*"]).pipe(dest("../dist/assets/php/"));
}
// В слежении: Следим за изменением файлов в этих папках
function watching() {
    watch(["../app/assets/fonts/**/*"], buildFonts);
    watch(["../app/assets/php/**/*"], buildPhp);
    watch(["../app/scss/**/*.scss"], styles);
    watch(["../app/assets/library/**/*.css"], stylesVendor);
    watch(["../app/assets/img/**/*"], images);
    watch(["../app/**/*.html"], htmlRun);
    watch(["../app/assets/js/*.js"], scripts);
    watch(["../app/assets/library/**/*.js"], scriptsVendor);
    watch(["../app/**/*.html"]).on("change", browserSync.reload);
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.stylesVendor = stylesVendor;
exports.htmlRun = htmlRun;
exports.scripts = scripts;
exports.scriptsVendor = scriptsVendor;
exports.images = images;
exports.watching = watching;
exports.cleanDist = cleanDist;

// gulp Запускаем работу галпа.
exports.default = parallel(styles, stylesVendor, scripts, scriptsVendor, images, buildFonts, buildPhp, htmlRun, watching, browsersync);
