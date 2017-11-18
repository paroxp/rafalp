var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-htmlmin');

gulp.task('html', function() {
  gulp.src('public/**/*.html')
    .pipe(minify({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('public'))
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        'node_modules/bourbon/app/assets/stylesheets',
        'node_modules/susy/sass',
      ],
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
