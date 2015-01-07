var gulp = 			require('gulp');
var sass = 			require('gulp-sass'); // https://www.npmjs.com/package/gulp-sass
var vulcanize =     require('gulp-vulcanize'); // https://www.npmjs.com/package/gulp-vulcanize
var traceur =   	require('gulp-traceur'); // https://www.npmjs.com/package/gulp-traceur
var bourbon =       require('node-bourbon');
var rename =        require('gulp-rename');
// var sourcemaps = 	require('gulp-sourcemaps');


var paths = {
	dist: 				'./dist/',
	components:         './components/',
	componentStyles:    './components/**/*.scss',
	componentES6:       './components/**/*.es6.js',
}

gulp.task('componentStyles', function (){

	gulp.src(paths.componentStyles)
		.pipe(sass({
			errLogToConsole: true,
			includePaths: bourbon.includePaths
		}))
		.pipe(gulp.dest(paths.components));
});

gulp.task('traceur', function(){
	return gulp.src(paths.componentES6)
		// .pipe(sourcemaps.init())
		.pipe(traceur())
		.pipe(rename(function (path) {
			path.basename = path.basename.replace('.es6', '');
		}))
        // .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.components));

});

/**
	junks all of the components together into one html file for production
*/ 
gulp.task('components:concat', function () {

	return gulp.src('components/components.html')
		
		// options are here: https://github.com/Polymer/grunt-vulcanize#options
		.pipe(vulcanize({
			dest: paths.dist,
			strip: true,
			inline: true // inlines css/js
		}))
		.pipe(gulp.dest(DEST_DIR));

});

//TODO: use gulp-watch instead. it can detect new files.
gulp.task('watch', ['default'], function(){
	gulp.watch(paths.componentStyles, ['componentStyles']);
	gulp.watch(paths.componentES6, ['traceur']);
});

gulp.task('default', ['componentStyles', 'traceur'], function(){
	
});
