// components/InstanceMap.tsx
//nuevo

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface Instance {
  id: number;
  user: {
    id: number;
    email: string;
  };
  location: {
    x: number;
    y: number;
  };
}

const InstanceMap: React.FC = () => {
  const [instances, setInstances] = useState<Instance[]>([]);

  useEffect(() => {
    // Fetch instances from the server
    fetch('/api/instances')
      .then(response => response.json())
      .then(data => setInstances(data));
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {instances.map(instance => (
        <Marker key={instance.id} position={[instance.location.x, instance.location.y]}>
          <Popup>
            <span>{instance.user.email}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InstanceMap;
