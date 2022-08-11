import React from 'react';
import PropTypes from 'prop-types';
import { buildMpuAd } from './utils';

/**
 * Mpu components
 *
 * Outputs three placeholders.
 *
 * The `pos` prop should only contain id suffix of the ad unit, all variations for device types
 * are created in this component. Thus if you wanted an ad unit of `mpu_r1`, just pass
 * in `r1` and the component will output all the variations of it; `mpu_r1`, `mpu_tablet_r1`
 * and `mpu_mobile_r1`
 *
 * @param {*} props
 */
const Mpu = (props) => {
  const { pos, sticky = false } = props;
  const Ad = buildMpuAd(pos);

  return (
    <div className={`inews__mpu ${sticky ? 'sticky' : ''}`}>
      {Ad}
    </div>
  );
};

Mpu.propTypes = {
  pos: PropTypes.string.isRequired,
  sticky: PropTypes.bool,
};

Mpu.defaultProps = {
  sticky: false,
};

export default Mpu;
