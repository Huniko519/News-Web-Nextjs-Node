import React from 'react';
import PropTypes from 'prop-types';
import DocHead from './DocHead';
import Header from './Header';
import Footer from './Footer';
import LeaderboardAd from './LeaderboardAd';
import Skyscraper from './ads/Skyscraper';

const Layout = (props) => {
  /**
   * fullWidth: If this is true the children components are output without any wrapping containers.
   *
   * disableLayoutLeaderboardAd: if true do not output top leaderboard/billboard
   * disableLayoutSkyscraperAd: if true do not output skyscrapers
   */
  const {
    children, dirtyAmp, router, fullWidth = false, disableLayoutLeaderboardAd = false, disableLayoutSkyscraperAd = false,
  } = props;
  const isHome = router.pathname === '/';

  return (
    <>
      <DocHead {...props} />
      <Header {...props} />
      {!disableLayoutSkyscraperAd && !isHome && dirtyAmp && <Skyscraper />}
      {!disableLayoutLeaderboardAd && !isHome && <LeaderboardAd {...props} />}
      {
        !fullWidth
          ? (
            <div className="inews__main">
              {children}
            </div>
          )
          : children
      }
      <Footer {...props} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  dirtyAmp: PropTypes.bool.isRequired,
  router: PropTypes.objectOf(PropTypes.any).isRequired,
  fullWidth: PropTypes.bool,
  isLongForm: PropTypes.bool,
  disableLayoutSkyscraperAd: PropTypes.bool,
  disableLayoutLeaderboardAd: PropTypes.bool,
};

Layout.defaultProps = {
  fullWidth: false,
  isLongForm: false,
  disableLayoutSkyscraperAd: false,
  disableLayoutLeaderboardAd: false,
};

export default Layout;
