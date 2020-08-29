"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = ['/*\n',
  ' * Portfolio - <%= pkg.title %> v<%= pkg.version %>\n',
  ' */\n',
  '\n'
].join('');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./dist/vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap JS
  var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*')
    .pipe(gulp.dest('./dist/vendor/bootstrap/js'));

  // Bootstrap SCSS
  var bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
    .pipe(gulp.dest('./dist/vendor/bootstrap/scss'));

  // Owl Carousel JS
  var owlJS = gulp.src('./node_modules/owl.carousel/dist/owl.carousel.min.js')
    .pipe(gulp.dest('./dist/vendor/owl/js'));

  // Owl Carousel CSS
  var owlCSS = gulp.src('./node_modules/owl.carousel/dist/assets/*.min.css')
    .pipe(gulp.dest('./dist/vendor/owl/css'));

  //Animate.css
  var animateCSS = gulp.src('./node_modules/animate.css/*.css')
    .pipe(gulp.dest('./dist/vendor/animate.css'));

  //waypoints JS
  var waypointsJS = gulp.src('./node_modules/waypoints/lib/jquery.waypoints.min.js')
  .pipe(gulp.dest('./dist/vendor/waypoints'));

  // Typed js
  var typedJS = gulp.src('./node_modules/typed.js/lib/typed.min.js')
  .pipe(gulp.dest('./dist/vendor/typedjs'));

  // jQuery Easing
  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest('./dist/vendor/jquery-easing'));

  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery'));

  // Parallax js
  var parallaxJS = gulp.src('./node_modules/parallax-js/dist/parallax.min.js')
    .pipe(gulp.dest('./dist/vendor/parallax'));

  // Hamburger SCSS
  var hamburgersSCSS = gulp.src('./node_modules/hamburgers/_sass/hamburgers/**/*')
  .pipe(gulp.dest('./dist/vendor/hamburgers/scss'));

  return merge(bootstrapJS, bootstrapSCSS, jquery, jqueryEasing, waypointsJS, typedJS, owlCSS, owlJS, animateCSS, parallaxJS, hamburgersSCSS);
}

// CSS task
function css() {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js',
    ])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", css);
  gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./dist/**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
