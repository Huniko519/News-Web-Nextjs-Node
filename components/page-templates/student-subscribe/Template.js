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
const StudentSubscribe = (props) => (

  <Layout disableLayoutLeaderboardAd disableLayoutSkyscraperAd fullWidth {...props}>
    <style global jsx>{stylesheet}</style>
    <script data-iframe="https://connect.studentbeans.com/v4/inews/uk/" data-load="connect" id="stb_root" src="https://cdn.studentbeans.com/third-party/all.js" />
    <div id="stb_root" />
  </Layout>
);

StudentSubscribe.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default StudentSubscribe;
