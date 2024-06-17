// pages/instances.tsx
import InstanceMap from '@/components/intanceMap/IntanceMap';
import React from 'react';

const InstancesPage: React.FC = () => {
  return (
    <div className="instances-page">
      <h1>Nearby Instances</h1>
      <InstanceMap />
    </div>
  );
};

export default InstancesPage;
