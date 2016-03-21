import gulp from 'gulp';
// import gutil, {PluginError} from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
// import assign from 'object-assign';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import del from 'del';
import webserver from 'gulp-webserver';
import livereload from 'gulp-livereload';
// import stylus from 'gulp-stylus';
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const paths = {
    htmlSrc: './src/index.html',
    build: './public',
    jsAll: './src/**/*.js',
    jsSrc: './src/index.js',
    jsDest: './public/js',
    jsBundled: 'bundle.js',
    css: 'css',
    stylesSrc: './src/styles',
    stylesDest: './public/css'
};
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['copy', 'copyjs', 'watch', 'webserver']);
gulp.task('copy', () => {
    return gulp.src([
            paths.htmlSrc
        ])
        .pipe(gulp.dest(paths.build));
});
gulp.task('copyjs', () => {
    return gulp.src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/angular2/bundles/angular2-polyfills.min.js'
        ])
        .pipe(gulp.dest(paths.jsDest));
});
gulp.task('build', ['copy', 'copyjs'], () => {
    const b = browserify(paths.jsSrc, {debug: true})
        .transform(babelify);
    return bundle(b);
});
gulp.task('webserver', function () {
    gulp.src(paths.build)
        .pipe(webserver({
            host: 'localhost',
            port: 9090,
            livereload: true,
            directoryListing: true,
            open: true
        }));
});
gulp.task('clean', () => {
    return del(paths.build);
});
function bundle(b) {
    return b.bundle()
        .on('error', (e) => {
            console.error(e.stack);
        })
        .pipe(source(paths.jsBundled))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.jsDest));
}
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function () {
    const bundler = watchify(browserify(paths.jsSrc, {
        cache: {},
        packageCache: {},
        fullPaths: true,
        transform: ['babelify'],
        debug: true
    }));

    function rebundle() {
        console.warn('rebundled!');
        return bundler.bundle()
            .pipe(source(paths.jsBundled))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.jsDest))
            .pipe(livereload({start: true}));
    }
    bundler.on('update', rebundle);
    // run any other gulp.watch tasks
    return rebundle();
});