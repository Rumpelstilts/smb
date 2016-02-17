var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var nano = require('gulp-cssnano')
var concat = require('gulp-concat')
var mainBowerFiles = require('gulp-main-bower-files')

var config = {
  sass_path: './src/sass',
  bower_dir: './bower_components'
}

gulp.task('main_bower_files', function () {
  return gulp.src('./bower.json')
    .pipe(mainBowerFiles({
      overrides: {
        'bootstrap-sass': {
          ignore: true // sass source is included in bundle.sass so we don't need this here; native js is replaced with ui.bootstrap
        },
        angular: {
          ignore: true // gotta add this manually, because order of jquery and angular is important
        },
        jquery: {
          ignore: true // same
        },
        'jquery-validation': {
          ignore: true // order of main files is important
        },
        stepy: {
          main: [
            './lib/jquery.stepy.js'
          ]
        },
        'bootstrap-datepicker': {
          main: [
            './dist/js/bootstrap-datepicker.min.js',
            './dist/css/bootstrap-datepicker3.min.css',
            './dist/locales/bootstrap-datepicker.ru.min.js'
          ]
        },
        'jquery.inputmask': {
          main: [
            './dist/min/jquery.inputmask.bundle.min.js'
          ]
        },
        'selectize': {
          main: [
            './dist/js/selectize.min.js',
            './dist/css/selectize.bootstrap3.css'
          ]
        },
        'suggestions-jquery': {
          main: [
            './dist/js/jquery.suggestions.min.js',
            './dist/css/suggestions.css'
          ]
        }
      }
    }))
    .pipe(gulp.dest('./build/bower_files'))
})

gulp.task('js', function () {
  //  load jquery first, angular second to avoid conflicts
  return gulp.src([
    config.bower_dir + '/jquery/dist/jquery.min.js',
    config.bower_dir + '/angular/angular.min.js',
    config.bower_dir + '/jquery-validation/dist/jquery.validate.min.js',
    config.bower_dir + '/jquery-validation/dist/additional-methods.min.js',
    './build/**/**/*.js',
    './src/**/**/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('js-watch', ['js'], browserSync.reload)

gulp.task('sass', function () {
  return gulp.src(config.sass_path + '/bundle.scss')
    .pipe(sass({
      includePaths: [config.sass_path + '/mixins', config.bower_dir + '/bootstrap-sass/assets/stylesheets', config.bower_dir + '/font-awesome-sass/assets/stylesheets']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
})

gulp.task('fonts', function () {
  return gulp.src(config.bower_dir + '/font-awesome-sass/assets/fonts/font-awesome/*.*')
    .pipe(gulp.dest('dist/fonts/font-awesome'))
})

gulp.task('json', function () {
  return gulp.src('./src/json/**/*.json')
    .pipe(gulp.dest('dist/json'))
})

gulp.task('templates', function () {
  return gulp.src('./src/**/**/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
})

gulp.task('css', function () {
  return gulp.src('./build/**/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.css'))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(nano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

gulp.task('browser-sync', ['sass', 'css', 'main_bower_files', 'js', 'templates', 'fonts', 'json'], function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })

  gulp.watch('./src/app/**/*.js', ['js-watch'])
  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./build/css/*.css', ['css'])
  gulp.watch('./src/**/**/*.html', ['templates'])
})

gulp.task('default', ['browser-sync'], function () {})
