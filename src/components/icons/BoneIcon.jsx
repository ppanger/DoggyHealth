import React from 'react';

const BoneIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 40" fill="currentColor">
    <rect x="20" y="12" width="60" height="16" rx="8" />
    <circle cx="20" cy="12" r="10" />
    <circle cx="20" cy="28" r="10" />
    <circle cx="80" cy="12" r="10" />
    <circle cx="80" cy="28" r="10" />
  </svg>
);

export default BoneIcon;