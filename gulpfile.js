var config = require('./gulp.config')();

var gulp = require('gulp'),
    angularFileSort = require('gulp-angular-filesort'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngHtml2js = require('gulp-ng-html2js'),
    sass = require('gulp-sass'),
    del = require('del'),
    eventStream = require('event-stream');

gulp.task('clean-dev', cleanDev);
gulp.task('compile', compile);
gulp.task('dev', ['clean-dev'], compile);

gulp.task('default', ['dev']);

function cleanDev() {
    return del(config.dev.index);
}

function compile() {
    return eventStream.merge(
        buildIndex()
    );
}

function buildIndex() {
    return gulp.src(config.sources.index)
        .pipe(inject(buildScripts(), {relative: true, name: 'plugin'}))
        .pipe(inject(buildDemoScripts(), {relative: true}))
        .pipe(inject(buildTemplates(), {relative: true, name: 'templates'}))
        .pipe(inject(buildVendorScripts(), {relative: true, name: 'vendor'}))
        .pipe(inject(buildStyles(), {relative: true}))
        .pipe(gulp.dest(config.dev.index));
}

function buildScripts() {
    return gulp.src(config.sources.scripts)
        .pipe(angularFileSort())
        .pipe(ngAnnotate())
        .pipe(concat('ng-datetime.js'))
        .pipe(gulp.dest(config.dev.scripts));
}

function buildDemoScripts() {
    return gulp.src(config.sources.demoScripts)
        .pipe(angularFileSort())
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.dev.demoScripts));
}

function buildTemplates() {
    return gulp.src(config.sources.templates)
        .pipe(ngHtml2js({moduleName: 'templates'}))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.dev.templates));
}

function buildVendorScripts() {
    return gulp.src(config.sources.vendors)
        .pipe(gulp.dest(config.dev.vendors));
}

function buildStyles() {
    return gulp.src(config.sources.stylesheets)
        .pipe(sass())
        .pipe(concat('ng-datetime.css'))
        .pipe(gulp.dest(config.dev.stylesheets));
}