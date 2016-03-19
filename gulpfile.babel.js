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
            'src/index.html',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/angular2/bundles/angular2-polyfills.min.js'
        ])
        .pipe(gulp.dest('public'));
});
gulp.task('build', ['copy'], () => {
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
gulp.task('default', ['copy', 'watch', 'webserver']);
function bundle(b) {
    return b.bundle()
        .on('error', (e) => {
            console.error(e.stack);
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public'))
        .pipe(livereload({start: true}));
}
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
// // add custom browserify options here
// const customOpts = {
//     entries: ['./src/index.js'],
//     debug: true
// };
// const opts = assign({}, watchify.args, customOpts);
// const b = watchify(browserify(opts))
//     .transform(babelify);
// // add transformations here
// // so you can run `gulp js` to build the file
// gulp.task('js', bundlejs);
// // on any dep update, runs the bundler
// b.on('update', bundlejs);
// // output build logs to terminal
// b.on('log', gutil.log);
// function bundlejs() {
//     return b.bundle()
//         // log errors if they happen
//         .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//         .pipe(source('bundle.js'))
//         // optional, remove if you don't need to buffer file contents
//         .pipe(buffer())
//         // optional, remove if you dont want sourcemaps
//         .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
//         // Add transformation tasks to the pipeline here.
//         .pipe(sourcemaps.write('./')) // writes .map file
//         .pipe(gulp.dest('./dist'));
// }