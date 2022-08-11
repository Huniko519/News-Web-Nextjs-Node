import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../Layout';
import stylesheet from './styles.scss';

/* eslint-disable max-len */

/**
 * Subscribe page template
 *
 * @param {*} props
 */
const Subscribe = (props) => (

  <Layout disableLayoutLeaderboardAd disableLayoutSkyscraperAd fullWidth {...props}>
    <style global jsx>{stylesheet}</style>
    <div id="piano-container-subscribe" />
  </Layout>
);

Subscribe.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Subscribe;
