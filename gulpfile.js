var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var inject = require("gulp-inject");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var bower = require('gulp-bower');

var dist = {
	root: './dist/',
	index: './dist/index.html',
	scripts: './dist/scripts/',
	styles: './dist/styles/'
};

gulp.task('sass', function () {
    gulp.src('./src/styles/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(dist.styles));
});

gulp.task('compilejs', function () {
	var bundler = browserify('./src/scripts/main.js');
	bundler.transform(reactify);
	bundler.bundle()
	    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
	    .pipe(source('main.js'))
	    .pipe(gulp.dest(dist.scripts));
});

gulp.task('compress', function() {
  gulp.src(dist.scripts + '/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('vendor', function() {
  gulp.src([
  		'./src/vendor/jquery/jquery.min.js',
  		'./src/vendor/bootstrap/dist/js/bootstrap.min.js',
  		'./src/vendor/highcharts.js',
  		'./src/vendor/html5shiv.js'
  	])
    .pipe(concat('_vendor.js'))
    .pipe(gulp.dest(dist.scripts));
  gulp.src([
  		'./src/vendor/bootstrap/dist/css/bootstrap.min.css'
  	])
    .pipe(concat('_vendor.css'))
    .pipe(gulp.dest(dist.styles));
});

gulp.task('clean', function () {
  // return gulp.src([dist.scripts, dist.styles], {read: false})
  //   .pipe(clean());
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./src/vendor/'))
});

gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], {read: false});
 
  return target.pipe(inject(sources, {ignorePath: '/dist'}))
    		   .pipe(gulp.dest(dist.root));
});

gulp.task('buildDev', ['clean', 'bower', 'sass', 'compilejs', 'vendor', 'index']);
gulp.task('build', ['clean', 'bower', 'sass', 'compilejs', 'vendor', 'index']);


gulp.task('watch', function() {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
  gulp.watch('./src/scripts/**/*.js', ['compilejs']);
  gulp.watch('./src/scripts/**/*.jsx', ['compilejs']);
  gulp.watch('./src/index.html', ['index']);
  gulp.src(dist.root)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', ['buildDev', 'watch']);
