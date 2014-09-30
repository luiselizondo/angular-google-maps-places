# Google Maps Places with Angular.js

The module allows you to include a Google Map using Angular.js

## Directives included

1. placesmap
2. map
3. markermapr

## Examples
Take a look at the examples directory

## Installation
You need to include several scripts, if you need to use the placesmap directive, you need to include:

		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places"></script>

If you need to use the map or markermap directives, you need to include the following file and set an API_KEY. If you need help getting an API KEY go to the [Official documentation](https://developers.google.com/maps/documentation/javascript/tutorial)

	<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=API_KEY"></script>

	or

	<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?sensor=true"></script>

Additionaly, include the script and css from this module:

	<link rel="stylesheet" href="/angular-google-maps-places/dist/angular-google-maps-places.min.css">
	<script src="/angular-google-maps-places/dist/angular-google-maps-places.min.js"></script>
