The module allows you to include a Google Map using Angular.js

# Directives included

1. placesmap
2. map
3. markermapr

# Examples

## Simple map
Shows a very simple map. No markers included.

		<map 
			id = "map"
			height = "250px" 
			ltn = "25.716931052012836" 
			lng = "-100.2007561546875" 
			zoom = "14">
		</map>

## Marker map
Shows a map with a marker included pointing to the location set in the attributes

		<markermap 
			id = "map"
			height = "250px" 
			ltn = "25.716931052012836" 
			lng = "-100.2007561546875" 
			markerltn = "-100.2007561546875"
			markerlng = "25.716931052012836"
			markerdraggable = "true"
			markertitle = "Move me!"
			zoom = "14">
		</markermap>

## Places map
Shows a map with a search

		<placesmap 
			id = "map"
			height = "250px" 
			ltn = "25.716931052012836" 
			lng = "-100.2007561546875" 
			markerdraggable = "true"
			markertitle = "Move me!"
			placeholder = "Enter a location"
			zoom = "14">
		</placesmap>

		<label for="ltn">Latitude</label>
		<input type="text" name="ltn" ng-model="location.ltn" />

		<label for="lng">Longitude</label>
		<input type="text" name="lng" ng-model="location.lng" />

#### Events
The module emits events when you search for a place or when you finish dragging the marker. When the event is fired, you can access the position.

	var app = angular.module("app", ["le.google-maps-places"]);

	app.controller("MapController", ["$scope", function($scope) {
		$rootScope.$on("placeChanged", function(e, position) {
			$scope.$apply(function() {
				$scope.location.ltn = position.ltn;
				$scope.location.lng = position.lng;
			});
		});

		$rootScope.$on("markerDragEnd", function(e, position) {
			$scope.$apply(function() {
				$scope.location.ltn = position.ltn;
				$scope.location.lng = position.lng;
			});
		});
	}]);

# Installation
You need to include several scripts, if you need to use the placesmap directive, you need to include:

		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places"></script>

If you need to use the map or markermap directives, you need to include the following file and set an API_KEY. If you need help getting an API KEY go to the [Official documentation](https://developers.google.com/maps/documentation/javascript/tutorial)

	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=API_KEY">

Additionaly, include the script and css from this module:

	<link rel="stylesheet" href="/angular-google-maps-places/src/angular-google-maps-places.css">
	<script src="/angular-google-maps-places/src/angular-google-maps-places.js"></script>
