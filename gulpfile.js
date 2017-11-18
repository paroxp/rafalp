var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-htmlmin');
var sass = require('gulp-sass');

gulp.task('css', ['sass'], function() {
  return gulp.src('static/css/*.css')
    .pipe(autoprefixer({
      browsers: ['since 2010'],
      cascade: false
    }))
    .pipe(gulp.dest('static/css'))
});

gulp.task('html', function() {
  return gulp.src('public/**/*.html')
    .pipe(minify({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('public'))
});

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        'node_modules/susy/sass',
      ],
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
