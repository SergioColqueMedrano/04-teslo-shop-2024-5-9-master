// components/BuildingSelector.tsx
import React from 'react';

interface Building {
  id: number;
  name: string;
  cost: number;
  benefits: string;
  unlocked: boolean;
  isResourceExtractor: boolean;
}

interface BuildingSelectorProps {
  buildings: Building[];
  onSelect: (building: Building) => void;
}

const BuildingSelector: React.FC<BuildingSelectorProps> = ({ buildings, onSelect }) => {
  return (
    <div className="building-selector">
      <h2>Select a Building to Construct</h2>
      <ul>
        {buildings.map((building) => (
          <li key={building.id} className={`building ${building.unlocked ? '' : 'locked'}`}>
            <h3>{building.name}</h3>
            <p>Cost: {building.cost}</p>
            <p>Benefits: {building.benefits}</p>
            <button 
              onClick={() => onSelect(building)} 
              disabled={!building.unlocked}
            >
              {building.unlocked ? 'Build' : 'Locked'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuildingSelector;
