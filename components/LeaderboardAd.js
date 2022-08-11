import React, { useContext } from 'react';
import Leaderboard from './ads/Leaderboard';
import PageContext from './PageContext';
import { renderBillboardAd } from './ads/utils';

const LeaderboardAd = () => {
  const ctx = useContext(PageContext);
  return (
    <div className={`inews__leaderboard row center-xs ${!renderBillboardAd(ctx) ? 'inews__leaderboard-no-billboard' : ''}`}>
      <div className="col-xs-12 inews__leaderboard-inner">
        <div className="box">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardAd;
