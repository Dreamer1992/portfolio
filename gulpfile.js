const gulp = require('gulp');

const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
  root: './build',
  templates: {
    pages: 'src/templates/pages/*.pug',
    src: 'src/templates/**/*.pug'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'build/assets/styles/'
  },
  images: {
    src: 'src/images/**/*.*',
    dest: 'build/assets/images/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'build/assets/scripts/'
  }
}

//pug
function templates() {
  return gulp.src(paths.templates.pages)
    .pipe(plumber({
      errorHandler: notify.onError(function(error) {
        return {
          title: 'Pug',
          message: error.message
        };
      })
    }))
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.root));
}

//sass
function styles() {
  return gulp.src('./src/styles/app.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function(error) {
        return {
          title: 'Styles',
          message: error.message
        };
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest))
}

//clean
function clean() {
  return del(paths.root)
}

//webpack (3 версия)
function scripts() {
  return gulp.src('src/scripts/app.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest(paths.scripts.dest));
}

//галповский вотчер
function watch() {
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.scripts.src, scripts);
}

//локальный сервер + livereload
function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

//просто преносим картинки
function images() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;

gulp.task('default', gulp.series(
  clean,
  gulp.parallel(templates, styles, images, scripts),
  gulp.parallel(watch, server)
));