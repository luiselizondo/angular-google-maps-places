/* License: MIT.
 * Copyright (C) 2013, 2014, Uri Shaked.
 */

'use strict';

module.exports = function (grunt) {
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
	    options: {
	      curly: true,
	      eqeqeq: true,
	      eqnull: true,
	      browser: true,
	      globals: {
	        jQuery: true
	      },
	    },
	    all: ['src/*.js']
	  },
		uglify: {
			dist: {
				options: {
					sourceMap: true
				},
				files: {
					'dist/angular-google-maps-places.min.js': 'src/angular-google-maps-places.js'
				}
			}
		},
		cssmin: {
		  minify: {
		    expand: true,
		    cwd: 'src/',
		    src: ['*.css', '!*.min.css'],
		    dest: 'dist/',
		    ext: '.min.css'
		  }
		}
	});

	grunt.registerTask('test', [
		'jshint',
// 		'karma'
	]);

	grunt.registerTask('build', [
		'cssmin', 
		'uglify'
	]);

	grunt.registerTask('default', ['build']);
};
