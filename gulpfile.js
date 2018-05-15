var gulp = require('gulp');
// var uglify = require('gulp-uglify');
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');

gulp.task('sass', function(){
  return gulp.src('dev/*.js')
  .pipe(concat('app.js'))
  .pipe(uglify())
  .pipe(rename({
  suffix: '.min'
  }))
  .pipe(gulp.dest('build/js'));
 });