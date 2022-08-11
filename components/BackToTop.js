import React from 'react';

/**
 * Classnames for back to top elements
 */
const backToTopName = 'inews__back-to-top';
const observerName = `${backToTopName}_observer`;
const targetName = `${backToTopName}_target`;

/**
 * Animation definition for showing the back to top button
 *
 * @type {object}
 */
const showAnimation = {
  duration: '200ms',
  fill: 'both',
  iterations: 1,
  direction: 'alternate',
  animations: [
    {
      selector: `#${backToTopName}`,
      keyframes: [
        {
          opacity: 0.9,
          visibility: 'visible',
        },
      ],
    },
  ],
};

/**
 * Animation definition for hiding the back to top button
 *
 * @type {object}
 */
const hideAnimation = {
  duration: '200ms',
  fill: 'both',
  iterations: 1,
  direction: 'alternate',
  animations: [
    {
      selector: `#${backToTopName}`,
      keyframes: [
        {
          opacity: 0,
          visibility: 'hidden',
        },
      ],
    },
  ],
};

/**
 * SVG for arrow symbol
 *
 * @type {JSX}
 */
const arrowSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17.005" viewBox="0 0 15 17.005">
    <defs>
      <clipPath id="arrow-svg-path">
        <path d="M0,0H15V-17H0Z" fill="none" />
      </clipPath>
    </defs>
    <g transform="translate(0 17.005)">
      <g clipPath="url(#arrow-svg-path)">
        <g transform="translate(7.5 -1.25)">
          <path d="M0,0V-13.9" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.5" />
        </g>
        <g transform="translate(1.25 -8.97)">
          <path d="M0,0,6.25-6.785,12.5,0" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </g>
    </g>
  </svg>
);

/**
 * React component for the target portion of the back to top feature.
 *
 * Includes the target element we back up to and the position
 * observer that fires the show and hide animations for the back to
 * top button.
 *
 * The height at which the button is shown is defined by the position
 * of the amp-position-observer element which is positioned in the css
 *
 * @see /src/styles/partials/_back-to-top.scss
 * @see components/Header.js
 */
const Target = () => (
  <>
    <span
      id={targetName}
      className={targetName}
    />
    <span
      className={`${observerName} ${observerName}_top`}
    >
      <amp-position-observer
        on="enter:show-back-to-top.start; exit:hide-back-to-top.start"
        layout="nodisplay"
      />
    </span>
  </>
);

/**
 * React component for the button portion of the back to top feature.
 *
 * Includes the back to top button and the amp-animaton definitions for
 * the hide and show animatons.
 *
 * @see components/Footer.js
 */
const BackToTop = () => (
  <>
    <button
      id={backToTopName}
      className={backToTopName}
      on={`tap:${targetName}.scrollTo(duration=200)`}
      type="button"
    >
      {arrowSvg}
      <span>Back to top</span>
    </button>
    <amp-animation
      id="show-back-to-top"
      layout="nodisplay"
    >
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showAnimation) }}
      />
    </amp-animation>
    <amp-animation
      id="hide-back-to-top"
      layout="nodisplay"
    >
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hideAnimation) }}
      />
    </amp-animation>
  </>
);

BackToTop.Target = Target;

export default BackToTop;
