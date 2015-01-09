var gulp = 			require('gulp');
var sass = 			require('gulp-sass'); // https://www.npmjs.com/package/gulp-sass
var vulcanize =     require('gulp-vulcanize'); // https://www.npmjs.com/package/gulp-vulcanize
var traceur =   	require('gulp-traceur'); // https://www.npmjs.com/package/gulp-traceur
var bourbon =       require('node-bourbon');
var rename =        require('gulp-rename');
var plumber =       require('gulp-plumber');
var jade = 			require('jade');
var fs = 			require('fs');
var merge = 		require('merge');
var glob = 			require("glob")

// var sourcemaps = 	require('gulp-sourcemaps');

var paths = {
	dist: 				'./dist/',
	components: 		'./components/',
	componentSCSS: 		'./components/**/*.scss',
	componentES6: 		'./components/**/*.es6.js',
}

gulp.task('components:styles', function (){

	gulp.src(paths.componentSCSS)
		.pipe(sass({
			errLogToConsole: true,
			includePaths: bourbon.includePaths
		}))
		.pipe(gulp.dest(paths.components));
});

gulp.task('components:scripts', function(){
	//FIXME: sourcemaps. not working for some reason. File name appearch correct, but points to compiled js file

	return gulp.src(paths.componentES6)
		// .pipe(sourcemaps.init())
		.pipe(plumber())
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
gulp.task('components:vulcanize', function () {

	return gulp.src('components/components.html')
		
		// options are here: https://github.com/Polymer/grunt-vulcanize#options
		.pipe(vulcanize({
			dest: paths.dist,
			strip: true,
			inline: true // inlines css/js
		}))
		.pipe(gulp.dest(DEST_DIR));

});

/**
	builds demo page for components
*/
gulp.task('components:demo', function () {

	glob("components/**/*demo.html", function (err, files) {
		if(err) console.log('ERROR: ', err);

		files.forEach(function(file){

			var pathSplit = file.split('/');
			var demoName = pathSplit[pathSplit.length-2];

			fs.readFile(file, function(err, data){
				if(err) console.log('ERROR: ', err);

				var options = {};
				var locals = {
					demoHTML: data
				}; 
				var html = jade.renderFile('components/demo/demo-template.jade', merge(options, locals));
				
				fs.writeFile("components/demo/" + demoName + ".html", html, function(err) {
					if(err){ console.log(err); }
				});
			});
		});
		
	});
});

//TODO: use gulp-watch instead. it can detect new files.
gulp.task('watch', ['default'], function(){
	gulp.watch(paths.componentSCSS, ['components:styles']);
	gulp.watch(paths.componentES6, ['components:scripts']);
});

gulp.task('default', ['components:styles', 'components:scripts'], function(){
	
});
