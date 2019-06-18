var browserify = require('browserify'),
    gulp = require('gulp');
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    sourceFile = './js/index.js',
    destFolder = './dist/',
    destFile = 'dapp-sdk.min.js';

function browserify() {
    /* browserify */ 
    gulp.task('browserify', function() {

        var bundler = browserify({
        entries: sourceFile,
        cache: {}, packageCache: {}, fullPaths: true, debug: true
        });
    
        var bundle = function() {
        return bundler
            .bundle()
            .on('error', function () {})
            .pipe(source(destFile))
            .pipe(gulp.dest(destFolder));
        };
    
        if(global.isWatching) {
        bundler = watchify(bundler);
        bundler.on('update', bundle);
        }
    
        return bundle();
    });
}

exports.default = browserify;
