(function() {
	'use strict';

	/**
	 * Map class
	 * @param {object} options The attributes passed from the element
	 */
	function Map(options) {
		var defaultOptions = {
			center: { 
      	lat: typeof options.ltn !== "undefined" ? parseFloat(options.ltn) : -25.363882, 
      	lng: typeof options.lng !== "undefined" ? parseFloat(options.lng) : 131.044922
      },
      zoom: typeof options.zoom !== "undefined" ? Number(options.zoom) : 8
		};

		this.mapOptions = defaultOptions;
	}

	// Displays a simple map with no marker on it.
	Map.prototype.simpleMap = function() {
		var self = this;
		return new google.maps.Map(document.getElementById('map-canvas'), self.mapOptions);
	};

	// Displays a map with a marker
	Map.prototype.markerMap = function(attrs) {
		var self = this;
		var map = new google.maps.Map(document.getElementById('map-canvas'), self.mapOptions);

  	if(attrs.markerltn  !== "undefined" && attrs.markerlng !== "undefined") {
    	var markerLatitude = attrs.markerltn !== "undefined" ? parseFloat(attrs.markerltn) : -25.363882;
    	var markerLongitude = attrs.markerlng !== "undefined" ? parseFloat(attrs.markerlng) : 131.044922;
    	
    	// set the position of the marker using the attributes
    	var markerPosition = new google.maps.LatLng(markerLatitude, markerLongitude);
    	
    	// create the marker
    	var marker = new google.maps.Marker({
			    position: markerPosition,
			    map: map,
			    draggable: attrs.markerdraggable === "true" ? true : false,
			    title: attrs.markertitle !== "undefined" ? attrs.markertitle : null,
			});

			marker.setMap(map);
  	}

		return map;
	};

	Map.prototype.reverseGeocoding = function(scope, position) {
		var geocoder = new google.maps.Geocoder();

		geocoder.geocode({'latLng': position}, function(results, status) {
			if(status === google.maps.GeocoderStatus.OK) {
				if(results) {
					return scope.$emit("reverseGeocodingEnd:done", results);
				}
				else {
					return scope.$emit("reverseGeocodingEnd:error", "NO RESULTS");
				}
			}
			else {
				return scope.$emit("reverseGeocodingEnd:error", status);
			}
		});
	};

	Map.prototype.placesMap = function(scope, attrs) {
		var self = this;
		var map = new google.maps.Map(document.getElementById('map-canvas'), self.mapOptions);

		var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

    var types = document.getElementById('type-selector');
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

		var autocomplete = new google.maps.places.Autocomplete(input);
		autocomplete.bindTo('bounds', map);

		var infowindow = new google.maps.InfoWindow();

		var markerOptions = {
	    map: map,
	    anchorPoint: new google.maps.Point(0, -29),
	    draggable: attrs.markerdraggable === "true" ? true : false,
	  };

	  // check for a default marker position
  	var markerLatitude = attrs.markerltn !== "undefined" ? parseFloat(attrs.markerltn) : null;
  	var markerLongitude = attrs.markerlng !== "undefined" ? parseFloat(attrs.markerlng) : null;
  	
  	// set the position of the marker using the attributes
  	if(markerLatitude && markerLongitude) {
  		markerOptions.position = new google.maps.LatLng(markerLatitude, markerLongitude);
  	}

  	// setthe marker
	  var marker = new google.maps.Marker(markerOptions);

	  google.maps.event.addListener(marker, 'dragend', function() {
	    // map.setZoom(8);
	    // map.setCenter(marker.getPosition());
	    var position = marker.getPosition();
	    map.setCenter(position);

	    // try to reverse geocode the markerposition, 
	    // when finished, it will trigger an independent event
	    self.reverseGeocoding(scope, position);

	    scope.$emit("markerDragEnd", {
				ltn: position.lat(), 
				lng: position.lng(),
				position: position
			});
	  });

		google.maps.event.addListener(map, 'center_changed', function() {
			var position = marker.getPosition();
	    // map.panTo(marker.getPosition());

	    scope.$emit("centerChanged", position);
	  });

		google.maps.event.addListener(autocomplete, 'place_changed', function() {
	    infowindow.close();
	    marker.setVisible(false);
	    var place = autocomplete.getPlace();
	    if (!place.geometry) {
	      return;
	    }

	    // If the place has a geometry, then present it on a map.
	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(17);  // Why 17? Because it looks good.
	    }
	    marker.setIcon(/** @type {google.maps.Icon} */({
	      url: place.icon,
	      size: new google.maps.Size(71, 71),
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(17, 34),
	      scaledSize: new google.maps.Size(35, 35)
	    }));
	    marker.setPosition(place.geometry.location);
	    marker.setVisible(true);

	    var address = '';
	    if (place.address_components) {
	      address = [
	        (place.address_components[0] && place.address_components[0].short_name || ''),
	        (place.address_components[1] && place.address_components[1].short_name || ''),
	        (place.address_components[2] && place.address_components[2].short_name || '')
	      ].join(' ');
	    }

	    // Emit the event
	    scope.$emit("placeChanged", {
	    	ltn: place.geometry.location.lat(),
	    	lng: place.geometry.location.lng(),
	    	place: place,
	    	position: place.geometry.location
	    });

	    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
	    infowindow.open(map, marker);
	  });

	  return map;
	};

	// Directive function for map
	function simpleMap() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			template: '<div id="map-canvas"></div>',
			link: function(scope, element, attrs) {
				var map = new Map(attrs);
				map.simpleMap();
 			}
		};
	}

	// Directive function for markermap
	function markerMap() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			template: '<div id="map-canvas"></div>',
			link: function(scope, element, attrs) {
				var map = new Map(attrs);
				map.markerMap(attrs);
			}
		};
	}

	// directive function for geocodermap
	function placesMap() {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			template: '<div><input id="pac-input" class="controls" type="text" placeholder="{{placeholder}}" /><div id="map-canvas"></div></div>',
			link: function(scope, element, attrs) {
				scope.placeholder = typeof attrs.placeholder !== "undefined" ? attrs.placeholder : "Enter a location";
				var map = new Map(attrs);
				map.placesMap(scope, attrs);
			}
		};
	}

	// create angular module with the directives
	angular.module('le.google-maps-places', [])
		.directive("map", simpleMap)
		.directive("placesmap", placesMap)
		.directive("markermap", markerMap);
})();