var browserSync = require('browser-sync').create(),
    config = require('./gulp.config'),
    del = require('del'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

gulp.task('copy', function () {
    for (var item in config.copy) {
        gulp.src(config.copy[item].source)
            .pipe(gulp.dest(config.copy[item].destination));
    }

    return gulp;
});

gulp.task('default', ['serve']);

gulp.task('sass', function () {
    return gulp.src(config.sass.source)
        .pipe(sass(config.sass.configuration).on('error', sass.logError))
        .pipe(gulp.dest(config.sass.destination))
        .pipe(browserSync.stream());
});

gulp.task('serve', function () {
    browserSync.init({
        server: config.paths.root
    });

    gulp.watch(config.sass.source, ['sass']);
    gulp.watch(config.uglify.source, ['uglify']);
    gulp.watch('../**/*.html').on('change', browserSync.reload);

    return gulp;
});

gulp.task('uglify', function () {
    return gulp.src(config.uglify.source)
        .pipe(uglify(config.uglify.configuration))
        .pipe(gulp.dest(config.uglify.destination))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch(config.uglify.source, ['uglify']).on('change');
    gulp.watch(config.sass.source, ['sass']).on('change');

    return gulp;
});
