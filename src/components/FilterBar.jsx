import React from 'react';

const FilterBar = ({ selectedRegion, onRegionChange }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
