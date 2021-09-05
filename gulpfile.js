var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
var rename = require("gulp-rename");
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');


gulp.task('mini-JS', function() {

    return gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(gulp.dest('public/dist/js'))

})

// Sass compile into Css
gulp.task('scss', function() {
    return gulp.src('public/scss/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('public/dist/css'))
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('public/dist/css'))
});

/* connect server */
gulp.task('server', function() {
    nodemon({
        script: './src/app.js',
        ext: 'hbs js'
    });
});

gulp.task('watch', function() {
    gulp.parallel("scss", "mini-JS", "server")()
    gulp.watch('./public/scss/**/*.scss', gulp.series('scss'));
    gulp.watch("./public/js/*.js", gulp.series('mini-JS'));
    gulp.watch("./public/scss/**/*.scss").on("change", browserSync.reload);
    gulp.watch("./public/js/*.js").on("change", browserSync.reload);
    gulp.watch("./src/*.js").on("change", browserSync.reload);
    gulp.watch("./template/views/*.hbs").on("change", browserSync.reload);
    gulp.watch("./template/partical/*.hbs").on("change", browserSync.reload);
})