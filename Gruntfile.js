/* License: MIT.
 * Copyright (C) 2013, 2014, Uri Shaked.
 */

'use strict';

module.exports = function (grunt) {
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
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
		ngdocs: {
			options: {
				startPage: '/',
				title: false,
				html5Mode: false
			},
			api: {
				src: 'src/angular-google-maps-places.js',
				title: 'angular-google-maps-places API Documentation'
			}
		}
	});

	// grunt.registerTask('test', [
	// 	'jshint',
	// 	'karma'
	// ]);

	grunt.registerTask('build', [
		'uglify'
	]);

	grunt.registerTask('default', ['build']);
};
