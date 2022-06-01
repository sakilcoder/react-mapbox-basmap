import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const options = [
  { value: 'mapbox://styles/mapbox/satellite-streets-v11', label: 'Satellite streets' },
  { value: 'mapbox://styles/mapbox/satellite-v9', label: 'Satellite' },
  { value: 'mapbox://styles/mapbox/streets-v11', label: 'Streets' },
  { value: 'mapbox://styles/mapbox/outdoors-v11', label: 'Outdoors' },
  { value: 'mapbox://styles/mapbox/light-v10', label: 'Light' },
  { value: 'mapbox://styles/mapbox/dark-v10', label: 'Dark' },
  { value: 'mapbox://styles/mapbox/navigation-day-v1', label: 'Navigation day' },
  { value: 'mapbox://styles/mapbox/navigation-night-v1', label: 'Navigation night' },
];  

const Map = () => {
  const mapContainerRef = useRef(null);
  // const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    setMap(map);

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeBasemap = (event) => {
    let value=event.value;
    setSelectedOption(value);
    map.setStyle(value);
  };


  return (
    <div>
      <div className='sidebarStyle'>
        <div>
            <p>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
            <Select
              defaultValue={selectedOption}
              onChange={changeBasemap}
              options={options}
            />
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;