var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    path = require('path'),
    cleanhtml = require('gulp-cleanhtml'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber');


// ------------------------------------------


// paths
var paths = {
  scripts: ['javascripts/**/*.js'],
  images: 'img/**/*',
  sass: "scss/**/*.scss",
  html: "content/index.html",
  public_dist: "dist/**/*.*"
};


// ------------------------------------------


// Retrun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['html_dev', "html_prod"]);
  gulp.watch(paths.public_dist, ['public_dist']);
});



// copy index to /public for developing with pow
gulp.task('html_dev', function () {
  gulp.src(paths.html)
    .pipe(cleanhtml())
    .pipe(gulp.dest('./public/'));
});
gulp.task('html_prod', function () {
  gulp.src(paths.html)
    .pipe(cleanhtml())
    .pipe(gulp.dest('./'));
});



// compile sass to css and store it in dist
gulp.task('sass', function () {
  gulp.src('./scss/headstories.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
  gulp.src([
            './bower_components/jquery/jquery.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
            './bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
            "./javascripts/headstories.js"
            ])
    .pipe(plumber())
    .pipe(concat('headstories.js'))
    // This will output the non-minified version
    .pipe(gulp.dest('./dist/js'))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/js'))
});

// images
gulp.task('images', function () {
  gulp.src(paths.images)
    .pipe(gulp.dest('./dist/img'));
});

// copy files from dist to public dist as they change
gulp.task('public_dist', function () {
  gulp.src(paths.public_dist)
    .pipe(gulp.dest('./public/dist'));
});

// ------------------------------------------


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass', 'images', 'html_dev', 'html_prod', 'public_dist', 'scripts', 'watch']);
