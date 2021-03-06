import gulp from 'gulp';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import del from 'del';
import connect from 'gulp-connect';
import open from 'gulp-open';
import livereload from 'gulp-livereload';
import duration from 'gulp-duration';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import styleguide from 'sc5-styleguide';
import sassdoc from 'sassdoc';
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const paths = {
    htmlSrc: './src/index.html',
    build: './public',
    jsAll: './src/**/*.js',
    jsSrc: './src/index.js',
    jsDest: './public/js',
    jsBundled: 'bundle.js',
    stylesSrc: './src/styles/**/*.scss',
    stylesSrcRoot: './src/styles/style.scss',
    stylesDest: './public/css',
    stylesCSSDest: './public/css/style.css',
    stylesGuideRoot: '/styleguide',
    stylesGuideDest: './public/styleguide',
    stylesDocsDest: './public/css/sassdoc'
};
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['connect', 'stylespreview', 'stylesdebug', 'copy', 'copyjs', 'watch', 'watchscss', 'watchhtml', 'open']);
gulp.task('build', ['stylesprod', 'copy', 'copyjs'], () => {
    const b = browserify(paths.jsSrc, {
        debug: true
    })
        .transform(babelify);
    return bundle(b);
});
gulp.task('clean', () => {
    return del(paths.build);
});
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
gulp.task('connect', function () {
    connect.server({
        root: 'public',
        livereload: true
    });
});
gulp.task('open', function () {
    gulp.src(__filename)
        .pipe(open({
                uri: 'http://localhost:8080'
            })
        );
});
function bundle(b) {
    return b.bundle()
        .on('error', (e) => {
            console.error(e.stack);
        })
        .pipe(source(paths.jsBundled))
        .pipe(buffer())
        .pipe(gulp.dest(paths.jsDest));
}
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('styleguide:generate', function() {
    return gulp.src(paths.stylesSrc)
        .pipe(styleguide.generate({
            title: 'TNG Makes Styleguide',
            server: true,
            rootPath: paths.stylesGuideDest,
            overviewPath: 'README.md',
            parsers: {
                scss: 'scss'
            }
        }))
        .pipe(gulp.dest(paths.stylesGuideDest));
});
gulp.task('styleguide:applystyles', function() {
    return gulp.src(paths.stylesSrcRoot)
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(paths.stylesGuideDest));
});
// Start watching changes and update styleguide whenever changes are detected
// Styleguide automatically detects existing server instance
gulp.task('styleguidewatch', ['styleguide'], function() {
    gulp.watch([paths.stylesSrc], ['styleguide']);
});
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('watch', function () {
    const bundler = watchify(
        browserify(
            paths.jsSrc, {
                noparse: ['jquery', 'lodash'],
                cache: {},
                packageCache: {},
                fullPaths: true,
                transform: ['babelify'],
                debug: true
            }
        )
    );
    var bundleTimer;
    function rebundle() {
        bundleTimer = duration('Javascript bundle and reload duration');
        return bundler.bundle()
            .pipe(source(paths.jsBundled))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.jsDest))
            .pipe(bundleTimer)
            .pipe(livereload({start: true}));
    }

    bundler.on('update', rebundle);
    return rebundle();
});
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
gulp.task('watchscss', function () {
    return gulp
        .watch(paths.stylesSrc, ['stylespreview'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});
gulp.task('watchhtml', function () {
    return gulp
        .watch(paths.htmlSrc, ['copy'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});
gulp.task('stylesprod', function () {
    gulp.src(paths.stylesSrc)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.stylesDest))
});
gulp.task('stylespreview', function () {
    gulp.src(paths.stylesSrc)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(paths.stylesDest))
});
gulp.task('stylesdebug', function () {
    gulp.src(paths.stylesSrc)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
        .pipe(gulp.dest(paths.stylesDest))
});
gulp.task('stylesdoc', function () {
    var options = {
        dest: paths.stylesDocsDest,
        verbose: true,
        display: {
            access: ['public', 'private'],
            alias: true,
            watermark: true,
        },
        groups: {
            'undefined': 'Ungrouped',
            foo: 'Foo group',
            bar: 'Bar group',
        },
        basePath: 'https://github.com/SassDoc/sassdoc',
    };
    return gulp.src(paths.stylesSrc)
        .pipe(sassdoc(options));
});