(function() {
	'use strict';

	// Inject le.google-maps-places
	var app = angular.module("app", ["le.google-maps-places"]);
	app.controller("PlacesController", ["$scope", "$rootScope", function($scope, $rootScope) {
		// Define an empty object, it's needed
		$scope.location = {};

		// Act when the event placeChanged is emitted
		$rootScope.$on("placeChanged", function(e, position) {
			$scope.$apply(function() {
				// Update the location object
				$scope.location.ltn = position.ltn;
				$scope.location.lng = position.lng;

				console.log("This is the object position sent from the directive on the event placeChanged");
				console.log(position);

				angular.element(document.getElementById('latitude')).addClass("btn-success");
				angular.element(document.getElementById('longitude')).addClass("btn-primary");
			});
		});

		// Act when the event markerDragEnd is emitted
		$rootScope.$on("markerDragEnd", function(e, position) {
			$scope.$apply(function() {
				// Update the location object
				$scope.location.ltn = position.ltn;
				$scope.location.lng = position.lng;

				console.log("This is the object position sent from the directive on the event markerDragEnd");
				console.log(position);

				angular.element(document.getElementById('latitude')).addClass("btn-success");
				angular.element(document.getElementById('longitude')).addClass("btn-primary");
			});
		});

		$rootScope.$on("reverseGeocodingEnd:done", function(e, results) {
			console.log("Attempted to reverse geocode and got results:");
			console.log(results);
		});

		$rootScope.$on("reverseGeocodingEnd:error", function(e, error) {
			console.log(error);
		});
	}]);

})();