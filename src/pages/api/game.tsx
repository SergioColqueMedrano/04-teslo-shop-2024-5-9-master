// pages/game.tsx
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import BuildingSelector from '@/components/build/BuildingSelector';
import ResourceManager from '@/components/Resource/ResourceManager';

interface Building {
  id: number;
  name: string;
  cost: number;
  benefits: string;
  unlocked: boolean;
  isResourceExtractor: boolean;
  resourceExtracted: number;
  workers: number;
}

const Game: React.FC = () => {
  const { data: session } = useSession();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  useEffect(() => {
    // Fetch available buildings from the server
    fetch('/api/buildings')
      .then(response => response.json())
      .then(data => setBuildings(data));
  }, []);

  const handleSelectBuilding = (building: Building) => {
    setSelectedBuilding(building);
    // Additional logic for selecting location, etc.
  };

  const handleBuild = (location: { x: number, y: number }) => {
    if (!selectedBuilding || !session) return;

    fetch('/api/buildings/build', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session.user.id,
        buildingId: selectedBuilding.id,
        location,
      }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle successful building construction
    });
  };

  const handleAssignWorkers = (buildingId: number, workers: number) => {
    fetch('/api/buildings/assignWorkers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: session?.user.id,
        buildingId,
        workers,
      }),
    })
    .then(response => response.json())
    .then(data => {
      // Update state with new workers assignment
      setBuildings(buildings.map(b => b.id === buildingId ? { ...b, workers: data.workers } : b));
    });
  };

  return (
    <div className="game">
      <h1>Welcome to the Textile Game</h1>
      <BuildingSelector buildings={buildings} onSelect={handleSelectBuilding} />
      {selectedBuilding && (
        <div>
          <h2>Selected Building: {selectedBuilding.name}</h2>
          <p>Select a location to build:</p>
          {/* Implement location selection logic here */}
          <button onClick={() => handleBuild({ x: 0, y: 0 })}>Confirm Location</button>
        </div>
      )}
      <ResourceManager buildings={buildings.filter(b => b.isResourceExtractor)} onAssignWorkers={handleAssignWorkers} />
    </div>
  );
};

export default Game;
