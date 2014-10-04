'use strict';
/*jshint node:true*/

var gulp = require('gulp'),
    header  = require('gulp-header'),
    footer  = require('gulp-footer'),
    jshint  = require('gulp-jshint'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    license = require('gulp-license'),
    amdWrap = require('gulp-wrap-amd'),
    karma = require('gulp-karma');


gulp.task('build', function() {
    return gulp.src('src/knockout.lock.js')
        .pipe(header('(function(ko) {\n'))
        .pipe(license('MIT', { tiny: true, organization: 'Cristian Trifan' }))
        .pipe(footer('})(window.ko);\n'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('knockout.lock.min.js'))
        .pipe(uglify({ mangle: true, preserveComments: 'some' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-amd', function() {
    return gulp.src('src/knockout.lock.js')
        .pipe(amdWrap({ deps: ['knockout'], params: ['ko'], exports: 'lockBinding' }))
        .pipe(header('/*jshint quotmark:false*/\n'))
        .pipe(license('MIT', { tiny: true, organization: 'Cristian Trifan' }))
        .pipe(rename('knockout.lock.amd.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify({ mangle: true, preserveComments: 'some' }))
        .pipe(rename('knockout.lock.amd.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('test', ['build'], function() {
    return gulp.src(['vendor/knockout/dist/knockout.js', 'dist/knockout.lock.js', 'test/*.js'])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }));
});

gulp.task('default', ['build', 'build-amd', 'test']);

