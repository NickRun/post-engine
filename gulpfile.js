// Load modules
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    frontMatter = require('gulp-front-matter'),
    markdown = require('gulp-markdown-to-json'),
    pluck = require('gulp-pluck'),
    data = require('gulp-data'),
    path = require('path'),
    watch = require('gulp-watch'),
    meta = require('./build/meta.js'),
    del = require('del');

// Delete Data files
gulp.task('clean:data', function(cb) {
    return del(['dist/data/'],cb)
});

// Each post transformed into a JSON file
gulp.task('markdown-posts', function(){
    return gulp.src('./src/**/*.md')
        .pipe(markdown({
            pedantic: true,
            smartypants: true,
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        }))
        .pipe(gulp.dest('dist/data/posts/'))
        .pipe(notify({ message: 'markdown-posts task complete' }));
});

// Each post meta data transformed into a single JSON
gulp.task('markdown-meta', function() {
    gulp.src('./src/**/*.md')
    .pipe(frontMatter({property: 'meta'}))
    .pipe(data(function(file){
        // store filename & switch out .md for .json
        var extension = path.extname(file.path);
        file.meta.filename = path.basename(file.path, extension) + '.json';
    }))
    .pipe(pluck('meta', 'meta.json'))
    .pipe(data(function(file){
        // file.contents = new Buffer(JSON.stringify(file.meta))
        file.contents = new Buffer(meta.convert(file.meta)); 
    }))
    .pipe(gulp.dest('./dist/data/'))
    .pipe(notify({ message: 'markdown-meta task complete' }));
});

// Watch Task
gulp.task('watch', function () {
    watch('./src/**/*', function () {
        gulp.start('markdown-meta','markdown-posts'); 
    });
});

// Build Task
gulp.task('build', ['clean:data'], function () {
    gulp.start('markdown-meta','markdown-posts'); 
});