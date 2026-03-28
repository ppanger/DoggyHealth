import React from 'react';

const DogIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <ellipse cx="50" cy="60" rx="35" ry="30" />
    <circle cx="35" cy="45" r="12" />
    <circle cx="65" cy="45" r="12" />
    <ellipse cx="50" cy="70" rx="8" ry="6" />
    <circle cx="38" cy="48" r="3" fill="white" />
    <circle cx="62" cy="48" r="3" fill="white" />
    <circle cx="38" cy="48" r="1.5" fill="black" />
    <circle cx="62" cy="48" r="1.5" fill="black" />
    <ellipse cx="50" cy="58" rx="4" ry="3" fill="#FF6B9D" />
    <path d="M45 65 Q50 70 55 65" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

export default DogIcon;