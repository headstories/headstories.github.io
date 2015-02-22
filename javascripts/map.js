jQuery(document).ready(function () {
  if ($("#map").length > 0) {
    var map;
    var centerPosition = new google.maps.LatLng(50.829906,12.903351);

    var style = [
      {
        "featureType": "landscape.man_made",
          "stylers": [{
              "visibility": "on"
          }, {
              "color": "#f0e9e2"
          }]
      }
    ]

    // var style = [{
    //     "stylers": [{
    //         "visibility": "off"
    //     }]
    // }, {
    //     "featureType": "road",
    //         "stylers": [{
    //         "visibility": "on"
    //     }, {
    //         "color": "#ffffff"
    //     }]
    // }, {
    //     "featureType": "road.arterial",
    //         "stylers": [{
    //         "visibility": "on"
    //     }, {
    //         "color": "#E4E4E5"
    //     }]
    // }, {
    //     "featureType": "road.highway",
    //         "stylers": [{
    //         "visibility": "on"
    //     }, {
    //         "color": "#E4E4E5"
    //     }]
    // }, {
    //     "featureType": "landscape",
    //         "stylers": [{
    //         "visibility": "on"
    //     }, {
    //         "color": "#F7F6F5"
    //     }]
    // }, {
    //     "featureType": "water",
    //         "stylers": [{
    //         "visibility": "on"
    //     }, {
    //         "color": "#7fc8ed"
    //     }]
    // }, {}, {
    //     "featureType": "road",
    //         "elementType": "labels",
    //         "stylers": [{
    //         "visibility": "off"
    //     }]
    // }, {
    //     "featureType": "poi.park",
    //         "elementType": "geometry.fill",
    //         "stylers": [{
    //         "visibility": "on"
    //     }, {
    //         "color": "#A6CE39"
    //     }]
    // }, {
    //     "elementType": "labels",
    //         "stylers": [{
    //         "visibility": "on"
    //     }]
    // }, {
    //     "featureType": "landscape.man_made",
    //         "elementType": "geometry",
    //         "stylers": [{
    //         "weight": 0.9
    //     }, {
    //         "visibility": "off"
    //     }]
    // }]

    var options = {
        zoom: 16,
        center: centerPosition,
        scrollwheel: false,
        mapTypeControl: true,
        streetViewControl: true,
        panControl: false,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($('#map')[0], options);
    map.setOptions({
        styles: style
    });

    var marker = new google.maps.Marker({
        position: centerPosition,
        map: map
    });
  }
});
