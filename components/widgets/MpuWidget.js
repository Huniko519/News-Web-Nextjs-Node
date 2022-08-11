import React from 'react';
import PropTypes from 'prop-types';
import Mpu from '../ads/Mpu';

const MpuWidget = (props) => {
  const { widget } = props;
  const pos = widget?.options?.ad_pos;
  const sticky = !!widget?.options?.sticky;
  return (pos
    ? (
      <div className="widget box" key={widget.id}>
        <Mpu pos={pos} sticky={sticky} />
      </div>
    )
    : null
  );
};

MpuWidget.propTypes = {
  widget: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MpuWidget;
