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
};

var eventPagesFiles = {
  src: [
    './src/eventPages/contextMenu.js'
  ],
  opts: {
    base: './src/eventPages/'
  },
  dest: './build/eventPages/'
};

var contentScriptsFiles = {
  src: [
    './src/contentScripts/buildPageTree.js'
  ],
  opts: {
    base: './src/contentScripts/'
  },
  dest: './build/contentScripts/'
};

gulp.task('copy:all', function() {
  return gulp.src(staticFiles.src, staticFiles.opts)
    .pipe(gulp.dest(staticFiles.dest));
});

gulp.task('build:eventPages', function() {
  return gulp.src(eventPagesFiles.src, eventPagesFiles.opts)
    .pipe(babel({'presets': ['es2015']}))
    .pipe(gulp.dest(eventPagesFiles.dest));
});

gulp.task('build:contentScripts', function() {
  return gulp.src(contentScriptsFiles.src, contentScriptsFiles.opts)
    .pipe(babel({'presets': ['es2015']}))
    .pipe(gulp.dest(contentScriptsFiles.dest));
});

gulp.task('default', ['build:all']);
gulp.task('build:all',
  ['build:eventPages', 'build:contentScripts', 'copy:all']);
