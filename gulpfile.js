const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const deploy = require('gulp-gh-pages');

/*
  --TOP Level Functions ---
    gulp.task - define tasks
    gulp.src - point to files to use
    gulp.dest - point to folder to output
    gulp.watch - watch files and folders for changes
*/

// To deploy Dist folder on GitHub
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(deploy());
})

// Minify all HTML files in src folder
gulp.task('minifySrcHtml', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('dist'));
});

// Minify Js in src
gulp.task('minifySrcJs', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minifyLibJs', function() {
  return gulp.src('src/js/lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/lib'));
});

// Minify Css in src
gulp.task('minifySrcCss', function() {
  return gulp.src('src/css/*.css')
    .pipe(csso())
    .pipe(gulp.dest('dist/css'));
});


// Cleaning dist directory before redoing all tasks
gulp.task('clean', function(){
  return del(['dist']);
});

// Please run gulp clean before this task
gulp.task('default', [
  'minifySrcHtml',
  'minifySrcJs', 
  'minifyLibJs', 
  'minifySrcCss',
]);