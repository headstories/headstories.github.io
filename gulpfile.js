var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    path = require('path'),
    cleanhtml = require('gulp-cleanhtml'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    fileinclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),
    imageResize = require('gulp-image-resize');


// ------------------------------------------


// paths
var paths = {
  scripts: ['javascripts/**/*.js', 'bower_components/**/*.js'],
  images: 'img/**/*',
  fonts: 'fonts/**/*',
  sass: "scss/**/*.scss",
  html: ["content/**/*.html"],
  watch_html: ["content/**/*.html", "templates/**/*.html"],
  public_dist: "dist/**/*.*"
};


// ------------------------------------------


// Retrun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.watch_html, ['html_dev', "html_prod"]);
  gulp.watch(paths.public_dist, ['public_dist']);
});



// copy index to /public for developing with pow
gulp.task('html_dev', function () {
  gulp.src(paths.html)
    // .pipe(cleanhtml())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: "./"
    }))
    .pipe(gulp.dest('./public/'));
});
gulp.task('html_prod', function () {
  gulp.src(paths.html)
    // .pipe(cleanhtml())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: "./"
    }))
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
            './bower_components/modernizr/modernizr.js',
            './bower_components/bowser/bowser.js',
            './bower_components/demography/demography.js',
            './bower_components/sharpness/sharpness.js',
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
            './bower_components/blueimp-gallery/js/blueimp-gallery.js',
            './bower_components/blueimp-gallery/js/blueimp-gallery-indicator.js',
            './bower_components/blueimp-gallery/js/jquery.blueimp-gallery.js',
            './bower_components/blueimp-bootstrap-image-gallery/js/bootstrap-image-gallery.js',
            './bower_components/jquery-instagram/dist/instagram.js',
            './javascripts/map.js',
            './javascripts/headstories.js'
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

// fonts
gulp.task('fonts', function () {
  gulp.src(paths.fonts)
  .pipe(gulp.dest('./dist/fonts'));
});

// copy files from dist to public dist as they change
gulp.task('public_dist', function () {
  gulp.src(paths.public_dist)
    .pipe(gulp.dest('./public/dist'));
});


// crop images
gulp.task('lookbook_images', function () {
  gulp.src("./img/lookbook/**/*.{jpg,png}")
  .pipe(imageResize({
    width : 185,
    height : 185,
    crop : true,
    upscale : true
  }))
  .pipe(rename(function (path) { path.basename += "-thumb"; }))
  .pipe(gulp.dest('./dist/img/lookbook/'));
  // 2x
  gulp.src("./img/lookbook/**/*.{jpg,png}")
  .pipe(imageResize({
    width : 370,
    height : 370,
    crop : true,
    upscale : true
  }))
  .pipe(rename(function (path) { path.basename += "-thumb2x"; }))
  .pipe(gulp.dest('./dist/img/lookbook/'));


  // modal
  gulp.src("./img/lookbook/**/*.{jpg,png}")
  .pipe(imageResize({
    width : 900,
    height : 900,
    crop : false,
    upscale : true
  }))
  .pipe(rename(function (path) { path.basename += "-module"; }))
  .pipe(gulp.dest('./dist/img/lookbook/'));
  // 2x
  gulp.src("./img/lookbook/**/*.{jpg,png}")
  .pipe(imageResize({
    width : 1800,
    height : 1800,
    crop : false,
    upscale : true
  }))
  .pipe(rename(function (path) { path.basename += "-module2x"; }))
  .pipe(gulp.dest('./dist/img/lookbook/'));
});

// ------------------------------------------


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass', 'images','fonts', 'html_dev', 'html_prod', 'public_dist', 'scripts', 'lookbook_images', 'watch']);
