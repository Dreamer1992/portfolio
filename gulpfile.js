const gulp = require('gulp');
const pug = require('gulp-pug');

const paths = {
  root: './build',
  templates: {
    pages: 'src/templates/pages/*.pug',
    src: 'src/templates/**/*.pug',
    dest: 'build/assets/'
  }
}

//pug
function templates() {
  return gulp.src(paths.templates.pages)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.root));
}

exports.templates = templates;

// gulp.task('sass', function(){
//   return gulp.src('dev/*.js')
//   .pipe(concat('app.js'))
//   .pipe(uglify())
//   .pipe(rename({
//   suffix: '.min'
//   }))
//   .pipe(gulp.dest('build/js'));
// });