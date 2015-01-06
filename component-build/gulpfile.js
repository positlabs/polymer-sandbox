var gulp = 			require('gulp');
var sass = 			require('gulp-sass'); // https://www.npmjs.com/package/gulp-sass
var vulcanize = 	require('gulp-vulcanize'); // https://www.npmjs.com/package/gulp-vulcanize

var paths = {
	dist: 				'./dist/',
	componentStyles: 	'./components/**/*.scss',
}

gulp.task('componentStyles', function (){

    gulp.src(paths.componentStyles)
        .pipe(sass())
        .pipe(gulp.dest('./components'));
});


/**
	junks all of the components together into one html file
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


gulp.task('watch', ['default'], function(){
	gulp.watch(paths.componentStyles, ['componentStyles']);
});

gulp.task('default', ['componentStyles'], function(){
	
});
