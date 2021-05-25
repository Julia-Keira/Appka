map.addListener('bounds_changed', function () {
	grid.forEach(function (line) {
		line.setMap(null);
	});

	grid = [];

	if (map.getZoom() < 8)
		return false;

	/* TODO: make steps universal */
	var lineNumber = 0,
		verticalStep = 0.22799464953, // dla Grecji
		horizontalStep = 0.18087434659;

	var viewLeft = map.getBounds().getNorthEast().lng(),
		viewRight = map.getBounds().getSouthWest().lng(),
		lineLng = (viewRight - viewRight % verticalStep) + verticalStep;

	while (lineLng < viewLeft) {
		grid[lineNumber] = new google.maps.Polyline({
			path: [
				new google.maps.LatLng(map.getBounds().getNorthEast().lat(), lineLng),
				new google.maps.LatLng(map.getBounds().getSouthWest().lat(), lineLng)
			],
			map: map,
			strokeColor: '#ff0000',
			strokeWegth: 1,
			strokeOpacity: 0.5
		});

		lineLng += verticalStep;
		lineNumber++;
	}

	var viewTop = map.getBounds().getNorthEast().lat(),
		viewBottom = map.getBounds().getSouthWest().lat(),
		lineLat = (viewBottom - viewBottom % horizontalStep) + horizontalStep;

	while (lineLat < viewTop) {
		grid[lineNumber] = new google.maps.Polyline({
			path: [
				new google.maps.LatLng(lineLat, map.getBounds().getNorthEast().lng()),
				new google.maps.LatLng(lineLat, map.getBounds().getSouthWest().lng())
			],
			map: map,
			strokeColor: '#ff0000',
			strokeWegth: 1,
			strokeOpacity: 0.5
		});

		lineLat += horizontalStep;
		lineNumber++;
	}
});