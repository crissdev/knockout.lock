(function() {
    'use strict';
    /*jshint node:true*/

    var gulp = require('gulp');


    gulp.task('build', function() {
        var header  = require('gulp-header'),
            footer  = require('gulp-footer'),
            jshint  = require('gulp-jshint'),
            uglify  = require('gulp-uglify'),
            rename  = require('gulp-rename'),
            license = require('gulp-license');

        return gulp.src('src/knockout.lock.js')
            .pipe(header('(function(ko) {\n'))
            .pipe(license('MIT', { tiny: true, organization: 'Cristian Trifan' }))
            .pipe(footer('})(window.ko);\n'))
            .pipe(jshint())
            .pipe(jshint.reporter(require('jshint-stylish')))
            .pipe(gulp.dest('dist'))
            .pipe(rename('knockout.lock.min.js'))
            .pipe(uglify({ mangle: true, preserveComments: 'some' }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('build-amd', function() {
        var jshint  = require('gulp-jshint'),
            uglify  = require('gulp-uglify'),
            rename  = require('gulp-rename'),
            amdWrap = require('gulp-wrap-amd'),
            license = require('gulp-license'),
            header  = require('gulp-header');

        return gulp.src('src/knockout.lock.js')
            .pipe(amdWrap({ deps: ['knockout'], params: ['ko'], exports: 'lockBinding' }))
            .pipe(header('/*jshint quotmark:false*/\n'))
            .pipe(license('MIT', { tiny: true, organization: 'Cristian Trifan' }))
            .pipe(rename('knockout.lock.amd.js'))
            .pipe(jshint())
            .pipe(jshint.reporter(require('jshint-stylish')))
            .pipe(gulp.dest('dist'))
            .pipe(uglify({ mangle: true, preserveComments: 'some' }))
            .pipe(rename('knockout.lock.amd.min.js'))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('test', ['build'], function() {
        var karma = require('gulp-karma');

        return gulp.src(['vendor/knockout/dist/knockout.js', 'dist/knockout.lock.js', 'test/*.js'])
            .pipe(karma({
                configFile: 'karma.conf.js',
                action: 'run'
            }));
    });

    gulp.task('default', ['build', 'build-amd', 'test'], function() { });

})();
