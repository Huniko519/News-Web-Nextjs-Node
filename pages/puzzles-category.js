import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import stylesheet from '../src/styles/pages/puzzles.scss';
import categoryStylesheet from '../src/styles/pages/puzzles-category.scss';
import PageContext from '../components/PageContext';
import ScopedColorContext from '../components/ScopedColorContext';
import { PuzzleData, getDateF, getDate } from '../utils/puzzleData';

// week days
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Prepare mapping for feature puzzle based on day
 * Every day of the week will be assigned the next puzzle type,
 * and will be repaeated for remaingin days.
 */
const getDaysMapping = (categoryPuzzles) => {
  const mappings = {};
  const types = categoryPuzzles.map((puzzle) => puzzle.type);

  let index = 0;
  DAYS.forEach((day) => {
    mappings[day] = types[index];
    if (index === (types.length - 1)) {
      index = 0;
    } else {
      index += 1;
    }
  });
  return mappings;
};

/**
 * Fetch navigation item title from header menu
 */
const getPageTitle = (allMenus, slug) => {
  let menuHeader = 'Puzzles';
  if (allMenus) {
    const headerNavItems = allMenus.find((element) => element.name === 'Header Menu');
    const puzzlesNav = headerNavItems?.items.find((nav) => nav.slug === 'puzzles');
    menuHeader = puzzlesNav.child_items.find((item) => item.post_name === slug)?.title;
  }
  return menuHeader;
};

const PuzzleCategory = (props) => {
  const { allMenus = [] } = props;

  const { router } = useContext(PageContext);
  const puzzleCategory = router?.query?.slug;
  const colorKeys = [puzzleCategory];
  const categoryTitle = getPageTitle(allMenus, puzzleCategory);

  const currentDayName = new Date().toLocaleString('en-GB', { weekday: 'long', timeZone: 'Europe/London' });

  const categoryPuzzles = PuzzleData.filter((puzzleData) => puzzleData.category === puzzleCategory);
  const type = getDaysMapping(categoryPuzzles)?.[currentDayName];

  return (
    <Layout disableLayoutLeaderboardAd disableLayoutSkyscraperAd {...props}>
      <style global jsx>{stylesheet}</style>
      <style global jsx>{categoryStylesheet}</style>

      <ScopedColorContext colorKeys={colorKeys}>
        <div className="inews__archive__title">
          <h2>
            <span>{`Today's ${categoryTitle}`}</span>
          </h2>
        </div>

        <div className="inews__main__primary">
          <div className="puzzle-wrapper">
            {/* Puzzle Hero */}
            <div className="puzzle-hero">

              {categoryPuzzles.map((puzzleDataCat) => (
                <React.Fragment key={`${puzzleDataCat.type}-0`}>
                  {puzzleDataCat.type === type
                  && (
                    <div className={`puzzle-container puzzle-container-${puzzleDataCat.category}`}>
                      <>

                        {/* Featured Puzzle */}
                        {categoryPuzzles.map((puzzleData) => (
                          <React.Fragment key={`${puzzleData.type}-0`}>
                            {puzzleData.type === type
                            && (
                              <div className={`puzzle-item puzzle-item--featured puzzle-item-${puzzleData.type} ${categoryPuzzles.length === 1 ? 'puzzle-item--featured-single' : ''}`}>
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

                        {categoryPuzzles.map((puzzleData) => (
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
                  )}
                </React.Fragment>
              ))}
            </div>
            {/* End of Puzzle Hero */}

            {/* Puzzle Section  */}
            <div className="puzzle-section">
              {categoryPuzzles.map((puzzleData) => (
                <div className={`puzzle-section-${puzzleData.type}`} key={`${puzzleData.type}-section`}>
                  <h2 className="puzzle-title"><span>{puzzleData.puzzleTitle}</span></h2>
                  <div className="puzzle-container">
                    {puzzleData.data.map((item, index) => (
                      <React.Fragment key={`${puzzleData.type}-0`}>
                        {(index > 0) && (
                        <div className="puzzle-box" key={item.link}>
                          <a href={`/puzzles/${puzzleData.type}/${getDate(index)}`}>
                            <div className="puzzle-box-inner">
                              <div className="puzzle-box-container">
                                <img src={`${puzzleData.image}`} alt="inews puzzle" />
                              </div>
                              <div className="puzzle-box-container">
                                <p className="puzzle-box-title">{puzzleData.title}</p>
                                <p className="puzzle-box-date">{getDateF(index)}</p>
                                <a href={`/puzzles/${puzzleData.type}/${getDate(index)}`} className="puzzle-btn">Play</a>
                              </div>
                            </div>
                          </a>
                        </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* End of Puzzle Section */}
          </div>
        </div>
      </ScopedColorContext>

    </Layout>
  );
};

PuzzleCategory.propTypes = {
  allMenus: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export const config = { amp: true };
export default PuzzleCategory;
