const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const minify = require('gulp-htmlmin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

gulp.task('css', ['sass'], () => gulp.src('static/css/*.css')
    .pipe(autoprefixer({
      browsers: ['since 2010'],
      cascade: false
    }))
    .pipe(gulp.dest('static/css')));

gulp.task('html', () => gulp.src('public/**/*.html')
    .pipe(minify({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('public')));

gulp.task('js', () => gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['env', 'es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js')));

gulp.task('sass', () => gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        'node_modules/susy/sass',
      ],
    }).on('error', sass.logError))
    .pipe(gulp.dest('dist/css')));
