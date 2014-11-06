var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    path = require('path'),
    cleanhtml = require('gulp-cleanhtml'),
    minifyCSS = require('gulp-minify-css');


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
  gulp.src('./scss/andrezimpel.scss')
    .pipe(sass())
    .pipe(minifyCSS({
      removeEmpty: true
    }))
    .pipe(gulp.dest('./dist/css'));
});



gulp.task('scripts', function() {
  gulp.src([
            './bower_components/jquery/dist/jquery.js',
            './bower_components/bootstrap-sass/js/transition.js',
            './bower_components/bootstrap-sass/js/alert.js',
            './bower_components/bootstrap-sass/js/button.js',
            './bower_components/bootstrap-sass/js/carousel.js',
            './bower_components/bootstrap-sass/js/collapse.js',
            './bower_components/bootstrap-sass/js/dropdown.js',
            './bower_components/bootstrap-sass/js/modal.js',
            './bower_components/bootstrap-sass/js/tooltip.js',
            './bower_components/bootstrap-sass/js/popover.js',
            './bower_components/bootstrap-sass/js/scrollspy.js',
            './bower_components/bootstrap-sass/js/tab.js',
            './bower_components/bootstrap-sass/js/affix.js',
            './bower_components/twitter-text/twitter-text.js',
            './bower_components/momentjs/moment.js',
            './bower_components/instafeed.js/instafeed.js',
            "./javascripts/main.js"
            ])
    .pipe(uglify())
    .pipe(concat('andrezimpel.min.js'))
    .pipe(gulp.dest('./dist/js'));
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
