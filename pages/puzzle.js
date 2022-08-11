import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import stylesheet from '../src/styles/pages/puzzle.scss';
import { getPuzzleProp, getFormatedDate } from '../utils/puzzleData';

class Puzzle extends Component {
  static async getInitialProps(context) {
    const {
      type, year, month, day,
    } = context.query;

    const puzzleName = getPuzzleProp(type, 'title');

    return {
      type, year, month, day, puzzleName,
    };
  }

  render() {
    const {
      type, year, month, day, puzzleName,
    } = this.props;
    const formatedDate = getFormatedDate(`${year}-${month}-${day}`);
    // Build the puzzle embed iframe based on the above props
    return (
      <Layout {...this.props}>
        <style global jsx>{stylesheet}</style>
        <div className="inews__main__primary">
          <h1>
            {`${puzzleName} : `}
            <span className="puzzle-formated-date">{`${formatedDate}`}</span>
          </h1>
          <div id="puzzle-div">
            <amp-iframe
              layout="fill"
              frameborder="0"
              sandbox="allow-scripts allow-same-origin"
              width="300"
              height="200"
              resizable
              src={`https://d15iu2odxqexpf.cloudfront.net/puzzles/${type}/${year}-${month}-${day}.html`}
            >
              {/* todo: replace with a suitable loading placeholder image */}
              <div placeholder="true">Puzzle Loading...</div>
              <div overflow="true" tabIndex="0" role="button" aria-label="Read more">
                Click to expand
              </div>

            </amp-iframe>
          </div>
        </div>
      </Layout>
    );
  }
}

Puzzle.propTypes = {
  type: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  puzzleName: PropTypes.string,
};

Puzzle.defaultProps = {
  puzzleName: '',
};

export const config = { amp: true };
export default Puzzle;
