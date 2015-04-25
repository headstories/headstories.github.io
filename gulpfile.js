var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    path = require('path'),
    fs = require('fs'),
    cleanhtml = require('gulp-cleanhtml'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    fileinclude = require('gulp-file-include'),
    plumber = require('gulp-plumber'),
    imageResize = require('gulp-image-resize'),
    handlebars = require('gulp-compile-handlebars'),
    Handlebars = require('handlebars'),
    markdown = require('gulp-markdown-to-json'),
    logger = require('gulp-logger'),
    swig = require('gulp-swig'),
    data = require('gulp-data'),
    yaml = require('gulp-yaml'),
    gulpSequence = require('gulp-sequence'),
    foreach = require('gulp-foreach'),
    frontmatter = require('gulp-front-matter'),
    each = require("foreach"),
    marked = require("gulp-marked"),
    uncss = require('gulp-uncss'),
    changed = require('gulp-changed');


// ------------------------------------------


// paths
var paths = {
  scripts: ['javascripts/**/*.js', 'bower_components/**/*.js'],
  images: 'img/**/*',
  fonts: 'fonts/**/*',
  sass: "scss/**/*.scss",
  html: ["content/**/*.html", "content/**/*.md", "views/**/*.handlebars"],
  watch_html: ["content/**/*.html", "content/**/*.md", "views/**/*.handlebars"],
  public_dist: ["dist/**/*"]
};


// ------------------------------------------


// Retrun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.sass, ['sass', 'public_bower']);
  gulp.watch(paths.watch_html, ['convert']);
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
  sass('./scss/headstories.scss')
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest('./dist/css'));
});
gulp.task('uncss', function () {
  gulp.src('./dist/css/headstories.css')
  .pipe(uncss({
    html: ['./public/**/*.html']
  }))
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('./dist/css'))
});

gulp.task('scripts', function() {
  gulp.src([
            './bower_components/jquery/jquery.js',
            './bower_components/modernizr/modernizr.js',
            './bower_components/bowser/bowser.js',
            './bower_components/demography/demography.js',
            './bower_components/jquery.srcset/jquery.srcset.js',
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

gulp.task('dist', function () {
  gulp.src('./dist')
    .pipe(gulp.dest('./public/dist'));
});

// copy bower components to public dist
gulp.task('public_bower', function () {
  gulp.src('./bower_components/**/*.css')
    .pipe(gulp.dest('./dist/bower_components'));
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


// contents
gulp.task('convert', function() {
  var templateData = {
    slug: "products",
    title: "Products",
    layout: "main",
    body_class: "products"
  },
  options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    partials : {
      footer : '<footer>the end</footer>'
    },
    batch : ['./views/layouts/partials', './views/aside/', './views/lookbook'],
    helpers : {
      aside : function(name, context){
        try {
          var my_data = context.data.root;
          var f = fs.readFileSync('./views/aside/' + context.data.root.locale + '/' + name + '.handlebars', 'utf8');
          return Handlebars.compile(f)(my_data);
        } catch (e) {
          console.log(e);
          return "Partial not found";
        }
      },

      navigation : function(locale, context){
        try {
          var my_data = context.data.root;
          var f = fs.readFileSync('./views/layouts/partials/_navigation_' + locale + '.handlebars', 'utf8');
          return Handlebars.compile(f)(my_data);
        } catch (e) {
          return "Partial not found";
        }
      },

      stripHTML: function(content) {
        return content.replace(/<\/?[^>]+(>|$)/g, "").trim();
      }
    }
  }

  gulp.src('./content/**/**/*.md')
    .pipe(plumber())
    .pipe(changed('./public/', {extension: '.html'}))
    .pipe(frontmatter({ // optional configuration
      property: 'frontMatter', // property added to file object
      remove: true // should we remove front-matter header?
    }))
    .pipe(marked({
        // optional : marked options
    }))
    .pipe(data(function(file) {
      var data = file.frontMatter;
      data["body"] = decodeURI(file.contents);
      var cwd = file.cwd;
      var content_dir = cwd + "/content";
      var file_dir = path.dirname(file.path);

      console.log("-------");
      console.log("Processing:");
      console.log(file_dir);
      console.log(data.slug);

      // adjust file directory
      file_dir = file_dir.replace(content_dir, "") + "/";

      gulp.src('./views/layouts/' + file.frontMatter.layout + '.handlebars')
        .pipe(handlebars(data, options))
        .pipe(rename(file_dir + data.slug + '.html'))
        .pipe(gulp.dest('./'))
        .pipe(gulp.dest('./public/'));
    }))
});


// ------------------------------------------


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass', 'images','fonts', 'convert', 'dist', 'scripts', 'watch']);
