import L from 'leaflet'; // Import Leaflet for custom icon
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';

const MapComponent = ({ latitude, longitude }) => {
  const [position, setPosition] = useState([latitude, longitude]);

  useEffect(() => {
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  // Custom icon configuration
  const customIcon = new L.Icon({
    iconUrl: '/assets/leaflet-tiles/marker-icon.png', // Custom marker icon URL (ensure it's in the public folder)
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ flex: 1, height: '400px' }}>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '10px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon}>
            <Popup>Playdate Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

MapComponent.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default MapComponent;