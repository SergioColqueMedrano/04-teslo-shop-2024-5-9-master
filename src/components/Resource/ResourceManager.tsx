// components/ResourceManager.tsx
import React from 'react';

interface ResourceManagerProps {
  buildings: Building[];
  onAssignWorkers: (buildingId: number, workers: number) => void;
}

const ResourceManager: React.FC<ResourceManagerProps> = ({ buildings, onAssignWorkers }) => {
  const handleAssignWorkers = (buildingId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const workers = parseInt(event.target.value, 10);
    onAssignWorkers(buildingId, workers);
  };

  return (
    <div className="resource-manager">
      <h2>Manage Resources</h2>
      {buildings.map((building) => (
        <div key={building.id}>
          <h3>{building.name}</h3>
          <p>Resource Extracted: {building.resourceExtracted}</p>
          <input
            type="number"
            min="0"
            max="100"
            value={building.workers}
            onChange={(e) => handleAssignWorkers(building.id, e)}
          />
        </div>
      ))}
    </div>
  );
};

export default ResourceManager;
