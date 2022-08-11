import React from 'react';
import PropTypes from 'prop-types';

const Qoute = ({ size }) => (
  <div className={`${size} icon_qoute`}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.333 120">
      <defs>
        <clipPath id="clip-path">
          <path id="Path_2609" data-name="Path 2609" d="M0,35.4H67v-120H0Z" transform="translate(0 84.6)" />
        </clipPath>
      </defs>
      <g id="Group_10475" data-name="Group 10475" transform="translate(-812.5 -685.6)">
        <g id="Group_9515" data-name="Group 9515" transform="translate(812.5 685.6)">
          <g id="Group_9514" data-name="Group 9514" transform="translate(0 0)" clipPath="url(#clip-path)">
            <g id="Group_9513" data-name="Group 9513" transform="translate(0 0)">
              <path id="Path_2608" data-name="Path 2608" d="M18.114,23.286a106.078,106.078,0,0,0-6.03-9.787,17.009,17.009,0,0,1-3.127-10q0-5.106,4.243-15.957t16.75-31.7L11.637-55.65q-26.8,28.943-37.744,51.7T-37.05,33.712q0,15.319,9.38,22.979A31.773,31.773,0,0,0-7.123,64.35a30.761,30.761,0,0,0,19.43-6.809q8.71-6.8,8.71-20.851,0-8.079-2.9-13.4" transform="translate(37.05 55.65)" />
            </g>
          </g>
        </g>
        <g id="Group_9516" data-name="Group 9516" transform="translate(878.832 685.6)">
          <g id="Group_9514-2" data-name="Group 9514" transform="translate(0 0)" clipPath="url(#clip-path)">
            <g id="Group_9513-2" data-name="Group 9513" transform="translate(0 0)">
              <path id="Path_2608-2" data-name="Path 2608" d="M18.114,23.286a106.078,106.078,0,0,0-6.03-9.787,17.009,17.009,0,0,1-3.127-10q0-5.106,4.243-15.957t16.75-31.7L11.637-55.65q-26.8,28.943-37.744,51.7T-37.05,33.712q0,15.319,9.38,22.979A31.773,31.773,0,0,0-7.123,64.35a30.761,30.761,0,0,0,19.43-6.809q8.71-6.8,8.71-20.851,0-8.079-2.9-13.4" transform="translate(37.05 55.65)" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
);

Qoute.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
};

Qoute.defaultProps = {
  size: 'small',
};

export default Qoute;
