import React from 'react';

/**
 * Returns the SVG asset for the site logo
 *
 * @param {boolean} trimmed Setting this to true removes the spacing and returns
 * an SVG trimmed to the just the `i` symbol.
 */
export const getSVG = (trimmed = false) => (

  <svg width={!trimmed ? '50px' : '13px'} height={!trimmed ? '50px' : '38px'} viewBox={!trimmed ? '0 0 50 50' : '0 0 13 38'} version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform={!trimmed ? 'translate(19.140625, 6.250000)' : ''} fill="#e33a11">
        <circle cx="5.58066347" cy="4.31034483" r="4.31034483" />
        <polygon points="6.12536841e-15 12.8290921 9.26687036 12.8290921 9.26687036 33.7527062 12.0282846 33.7527062 12.0282846 37.4338935 0.0621562636 37.4338935 0.0621562636 33.7527062 3.1301615 33.7527062 3.1301615 16.5109777 6.12536841e-15 16.5109777" />
      </g>
    </g>
  </svg>
);
