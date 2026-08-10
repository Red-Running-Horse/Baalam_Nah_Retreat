import React from 'react';

const LogoMark = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 220 180"
    aria-hidden="true"
    focusable="false"
  >
    <path
      className="logo-shore"
      d="M18 42c42-25 85-26 123-2 23 15 42 18 63 12-16 25-39 39-67 43-47 7-87-11-119-53Z"
    />
    <path
      className="logo-shore"
      d="M19 138c32-41 71-59 118-52 28 4 51 18 67 43-21-6-41-3-64 12-37 24-80 23-121-3Z"
    />
    <path
      className="logo-channel"
      d="M76 88c13-12 25-20 35-24 11 4 23 12 35 24-9 4-16 11-19 20-11-5-22-5-33 0-3-9-9-16-18-20Z"
    />
    <circle className="logo-glint" cx="92" cy="89" r="5" />
    <circle className="logo-glint" cx="129" cy="89" r="5" />
    <path className="logo-glint" d="m106 105 5 8 5-8Z" />
  </svg>
);

export default LogoMark;
