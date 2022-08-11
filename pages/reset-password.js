/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

class ResetPassword extends Component {
  render() {
    return (
      <Layout {...this.props} disableLayoutLeaderboardAd disableLayoutSkyscraperAd disableLayoutOOPAd>
        <div className="inews__archive__title">
          <h1>Reset Your Password</h1>
        </div>
        <div className="inews__main__primary" />
      </Layout>
    );
  }
}

ResetPassword.propTypes = {
  yoastHead: PropTypes.string,
};

ResetPassword.defaultProps = {
  yoastHead: '',
};

export const config = { amp: true };
export default ResetPassword;
