const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const phpminify = require('gulp-php-minify');
const htmlmin = require('gulp-htmlmin');
const del = require('del');

const cssHandler = () => {
    return gulp.src('./css/*.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
}

const sassHandler = ()=>{
    return gulp.src('./sass/*.scss')   //找到所以要编译的sass文件
    .pipe(sass())    //把sass代码转换成css代码
    .pipe(autoprefixer())  //自动添加前缀(你可以做也可以不做)
    .pipe(cssmin())   //把已经转换好的css代码压缩
    .pipe(gulp.dest('./dist/css'))  //放到指定目录
}

const phpHandler = () => {
    return gulp.src(['*.php', './cart/interface/*.php', './cart/interface/model/*.php'])
        .pipe(phpminify())
        .pipe(gulp.dest('./dist/php'))
}

const htmlHandler = () => {
    return gulp.src(['./*.html', 'cart/*.html'])
        .pipe(htmlmin({
            "removeAttributeQuotes": true,
            "removeComments": true,
            "collapseBooleanAttributes": true,
            "collapseWhitespace": true,
            "minifyCSS": true,
            "minifyJS": true,
        }))
        .pipe(gulp.dest('./dist/pages'))
}

const imgHandler = () => {
    return gulp.src(['./img/**', './upload/**'])
        .pipe(gulp.dest('./dist/images'))
}

const libHandler = () => {
    return gulp.src(['./*.js', '*.json', './fonts/**','./swiper/**'])
        .pipe(gulp.dest('./dist/lib'))
}

const delHandler = () => {
    return del(['./dist'])
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, sassHandler,phpHandler, htmlHandler, imgHandler, libHandler)
)