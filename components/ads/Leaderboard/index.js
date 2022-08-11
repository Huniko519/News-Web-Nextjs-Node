import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PageContext from '../../PageContext';
import {
  renderBillboardAd,
} from '../utils';

const Leaderboard = (props) => {
  const { pos, className } = props;
  const ctx = useContext(PageContext);
  return (
    <>
      {
        !pos && (
        <>
          <div className="inews__advert" id="sticky_banner_top" data-pos="sticky_banner_top" />
          { renderBillboardAd(ctx)
            && (
            <>
              <div className="inews__advert" id="billboard" data-pos="billboard" />
              <div className="inews__advert" id="ldr_top" data-pos="ldr_top" />
            </>
            )}
        </>
        )
      }
      {
        pos && (
        <>
          <div className={`inews__advert ${className}`} id={pos} data-pos={pos} />
        </>
        )
      }
    </>
  );
};

Leaderboard.propTypes = {
  pos: PropTypes.string,
  className: PropTypes.string,
};

Leaderboard.defaultProps = {
  pos: '',
  className: 'inews__advert',
};

export default Leaderboard;
