import React from 'react';

const PawIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <ellipse cx="50" cy="65" rx="20" ry="18" />
    <ellipse cx="25" cy="40" rx="10" ry="12" />
    <ellipse cx="45" cy="30" rx="10" ry="12" />
    <ellipse cx="65" cy="35" rx="10" ry="12" />
    <ellipse cx="75" cy="50" rx="10" ry="12" />
  </svg>
);

export default PawIcon;