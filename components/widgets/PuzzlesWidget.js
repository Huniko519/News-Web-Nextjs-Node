import React from 'react';
import PropTypes from 'prop-types';
import { PuzzleData, getDate } from '../../utils/puzzleData';
import stylesheet from '../../src/styles/pages/puzzles.scss';

const PuzzlesWidget = (props) => {
  const { widget } = props;
  const title = widget?.options?.title;
  const puzzles = [];
  let puzzleIDs = [
    'concise', 'sudoku-easy', '11-lives', 'kriss-kross',
  ];

  const curatedPuzzles = widget?.options?.puzzles;
  if (curatedPuzzles && curatedPuzzles.length > 0) {
    puzzleIDs = curatedPuzzles.split(',');
  }

  /* eslint-disable no-restricted-syntax */
  for (const puzzleID of puzzleIDs) {
    const puzzleIndex = PuzzleData.findIndex((puzzle) => puzzle.type === puzzleID);
    puzzles.push(PuzzleData[puzzleIndex]);
  }

  return (
    <div className="inews__widget__puzzles puzzle-wrapper widget box start-xs" data-id={widget.id} key={widget.id}>
      <style global jsx>{stylesheet}</style>
      {widget.options?.title && <div className="inews__post-section__title "><h2 className="inews__widget__puzzles__title"><a href="/#">{title}</a></h2></div>}
      <div className="inews__widget__puzzles__list puzzle-hero">
        <div className="puzzle-container">
          {puzzles.map((puzzleData) => (
            <React.Fragment key={`${puzzleData.type}-0`}>
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
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

PuzzlesWidget.propTypes = {
  widget: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PuzzlesWidget;
