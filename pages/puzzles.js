import React, { useContext } from 'react';
import Layout from '../components/Layout';
import stylesheet from '../src/styles/pages/puzzles.scss';
import PageContext from '../components/PageContext';
import { PuzzleData, getDate } from '../utils/puzzleData';

/**
 * Puzzle page template
 *
 * @param {*} props
 */
const PuzzleTemplate = (props) => {
  const currentDayName = new Date().toLocaleString('en-GB', { weekday: 'long', timeZone: 'Europe/London' });
  const context = useContext(PageContext);
  const { router } = context;
  const isPuzzlesPage = router.pathname === '/puzzles';
  const dayMapping = {
    'Monday': 'five-clue',
    'Tuesday': 'sudoku-easy',
    'Wednesday': 'codeword',
    'Thursday': 'sudoku-tough',
    'Friday': 'splitwords',
    'Saturday': 'idoku',
    'Sunday': 'pieceword',
  };

  const type = dayMapping[currentDayName];

  return (
    <Layout disableLayoutLeaderboardAd disableLayoutSkyscraperAd {...props}>
      <style global jsx>{stylesheet}</style>
      <div className="inews__main__primary">

        <div className={`puzzle-wrapper ${isPuzzlesPage ? 'puzzle-wrapper-main-page' : null}`}>
          <h1 className="puzzle-header">Today&#39;s Puzzles</h1>

          {/* Puzzle Hero */}
          <div className="puzzle-hero">
            <div className="puzzle-container">
              <>

                {/* Featured Puzzle */}
                {PuzzleData.map((puzzleData) => (
                  <React.Fragment key={`${puzzleData.type}-0`}>
                    {puzzleData.type === type
                      && (
                        <div className={`puzzle-item puzzle-item--featured puzzle-item-${puzzleData.type}`}>
                          <a href={`/puzzles/${puzzleData.type}/${getDate(0)}`}>
                            <h2 className="puzzle-hero-header">Featured Puzzle</h2>
                            <img src={puzzleData.image} alt="inews puzzle" className="puzzle-item-icon" />
                            <p className="puzzle-item-title">{puzzleData.title}</p>
                            <span className="puzzle-btn">Play</span>
                          </a>
                        </div>
                      )}
                  </React.Fragment>
                ))}
                {/* End of Featured Puzzle */}

                {PuzzleData.map((puzzleData) => (
                  <React.Fragment key={`${puzzleData.type}-0`}>
                    {puzzleData.type !== type
                      && (
                        <div className={`puzzle-item puzzle-item-${puzzleData.type}`}>
                          <a href={`/puzzles/${puzzleData.type}/${getDate(0)}`}>
                            <div className="flex--col-2">
                              <img src={puzzleData.image} alt="inews puzzle" />
                              <div className="puzzle-item-info">
                                <p className="puzzle-item-title">
                                  {puzzleData.title}
                                </p>
                                <span className="puzzle-btn">Play</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      )}
                  </React.Fragment>
                ))}

              </>
            </div>
          </div>
          {/* End of Puzzle Hero */}

        </div>
      </div>
    </Layout>
  );
};

export const config = { amp: true };
export default PuzzleTemplate;
