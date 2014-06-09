(function() {
    'use strict';
    /*jshint node:true*/

    var gulp = require('gulp');


    gulp.task('build', function() {
        var header = require('gulp-header'),
            footer = require('gulp-footer'),
            jshint = require('gulp-jshint'),
            uglify = require('gulp-uglify'),
            rename = require('gulp-rename');

        return gulp.src('src/knockout.lock.js')
            .pipe(header('(function(ko) {\n'))
            .pipe(header('// knockout.lock, v0.0.1\n// Copyright (c)2014 Cristian Trifan (cristian)\n// Distributed under MIT license\n// https://github.com/CrissDev/knockout.lock\n'))
            .pipe(footer('})(window.ko);\n'))
            .pipe(jshint.reporter(require('jshint-stylish')))
            .pipe(gulp.dest('dist'))
            .pipe(rename('knockout.lock.min.js'))
            .pipe(uglify({ mangle: true }))
            .pipe(jshint())
            .pipe(gulp.dest('dist'));
    });

    gulp.task('build-amd', function() {
        var header = require('gulp-header'),
            footer = require('gulp-footer'),
            jshint = require('gulp-jshint'),
            uglify = require('gulp-uglify'),
            rename = require('gulp-rename');

        return gulp.src('src/knockout.lock.js')
            .pipe(header('define([\'knockout\'], function(ko) {\n'))
            .pipe(header('// knockout.lock, v0.0.1\n// Copyright (c)2014 Cristian Trifan (cristian)\n// Distributed under MIT license\n// https://github.com/CrissDev/knockout.lock\n'))
            .pipe(footer('});\n'))
            .pipe(rename('knockout.lock.amd.js'))
            .pipe(jshint.reporter(require('jshint-stylish')))
            .pipe(gulp.dest('dist'))
            .pipe(uglify({ mangle: true }))
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
