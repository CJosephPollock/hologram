'use strict';

var gulp       = require('gulp'),
	postcss    = require('gulp-postcss'),
	uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
	styles:  ['styles/style.css'],
	scripts: ['scripts/app.js']
};

var processors = [
	require('postcss-nested'),
	require('postcss-custom-properties'),
	require('autoprefixer')('last 2 versions', '> 1%', 'ie 9', 'ie 8', 'Firefox ESR'),
	require('cssnano')({autoprefixer: false, reduceIdents: false}) // Autoprefixer has just been run, don't do it again; reduceIdents is unsafe and creates conflicts on animation names.
];

gulp.task('styles', function() {
	return gulp.src(paths.styles)
		.pipe(sourcemaps.init())
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('styles/build/'));
});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('scripts/build/'));
});

gulp.task('watch', function() {
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.scripts, ['scripts']);
});

// Workflows
// $ gulp: Builds, prefixes, and minifies CSS files; concencates and minifies JS files; watches for changes. The works.
gulp.task('default', ['styles', 'scripts', 'watch']);

// $ gulp build: Builds, prefixes, and minifies CSS files; concencates and minifies JS files. For deployments.
gulp.task('build', ['styles', 'scripts', 'sitemap']);
