const gulp     = require('gulp'),
      uglifyjs = require('uglify-js-harmony'), // can be a git checkout or another module (such as `uglify-js-harmony` for ES6 support)
      minifier = require('gulp-uglify/minifier'),
      pump     = require('pump');

gulp.task('default', (cb) => {
	// the same options as described above
	const options = {
		preserveComments: 'license'
	};

	pump([
		     gulp.src('src/*.js'),
		     minifier(options, uglifyjs),
		     gulp.dest('dist')
	     ],
	     cb
	);
});