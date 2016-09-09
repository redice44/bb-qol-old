var gulp = require('gulp');
var babel = require('gulp-babel');

var staticFiles = {
  src: [
    './src/manifest.json'
  ],
  opts: {
    base: './src/'
  },
  dest: './build/'
}

gulp.task('copy:all', function() {
  return gulp.src(staticFiles.src, staticFiles.opts)
    .pipe(gulp.dest(staticFiles.dest));
});

gulp.task('build:eventPages', function() {

});

gulp.task('build:contentScripts', function() {

});

gulp.task('default', ['build:all']);
gulp.task('build:all', ['build:eventPages', 'build:contentScripts', 'copy:all']);
