import gulp from 'gulp';
import gutil, {PluginError} from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import assign from 'object-assign';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import del from 'del';
import webserver from 'gulp-webserver';
import livereload from 'gulp-livereload';
gulp.task('copy', () => {
    return gulp.src([
            'src/index.html'
        ])
        .pipe(gulp.dest('public'));
});
gulp.task('copyjs', () => {
    return gulp.src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/angular2/bundles/angular2-polyfills.min.js'
        ])
        .pipe(gulp.dest('public/js'));
});
gulp.task('build', ['copy','copyjs'], () => {
    const b = browserify('src/index.js', {debug: true})
        .transform(babelify);
    return bundle(b);
});
gulp.task('watch', () => {
    const b = browserify('src/index.js', assign({debug: true}, watchify.args))
        .transform(babelify);
    const w = watchify(b)
        .on('update', () => bundle(w))
        .on('log', gutil.log);
    return bundle(w)
});
gulp.task('webserver', function () {
    gulp.src('public')
        .pipe(webserver({
            host: 'localhost',
            port: 9090,
            livereload: true,
            directoryListing: true,
            open: true
        }));
});
gulp.task('clean', () => {
    return del('public');
});
gulp.task('default', ['copy', 'copyjs', 'watch', 'webserver']);
function bundle(b) {
    return b.bundle()
        .on('error', (e) => {
            console.error(e.stack);
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'))
        .pipe(livereload({start: true}));
}
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////