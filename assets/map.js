mapboxgl.accessToken = 'pk.eyJ1IjoicnNoYXd0d2lsaW8iLCJhIjoiY2sxcG03c3dpMHRoMTNtcGZieWY3d2NvZiJ9.zyN8LtxW1et_mPEiNRmGQA';
const map = new mapboxgl.Map({
                                    container: 'map',
                                    zoom: 6,
                                    center: [144.3453713, -38.1481387],
                                    pitch: 40,
                                    bearing: 50,
                                    style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
                            });

map.on('load', () => {
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 10
    });

    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

    // add a sky layer that will show when the map is highly pitched
    map.addLayer({
            'id': 'sky',
            'type': 'sky',
            'paint': {
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 15
            }
    });

    var settings = {
        "url": "/route",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);

        map.addSource('route', {
            'type': 'geojson',
            'data': {
            'type': 'Feature',
            'properties': {},
                'geometry': 
                {
                    'type': 'LineString',
                    'coordinates': 
                        response
                }
            }
    
            });
    
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
                'paint': {
                'line-color': 'red',
                'line-width': 5
            }
    
        });

    });

    const marker = new mapboxgl.Marker()
            .setLngLat([149.12015380432737, -35.30542394328677])
            .addTo(map)

});