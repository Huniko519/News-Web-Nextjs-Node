import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import stylesheet from '../src/styles/pages/error.scss';

class ErrorPage extends Component {
  static async getInitialProps({ res, err, error }) {
    let statusCode = res ? res.statusCode : 404;
    const errorData = {
      props: {
        error: { statusCode },
      },
      object: err,
    };

    // Override errorData if user defined error
    if (error && error.statusCode) {
      statusCode = error.statusCode;
      errorData.props.error = error;
      errorData.object = error;

      // Internal API error
      if (error.wpapi) {
        // Construct a mock error for issues with internal api for easier discovery in new relic
        const message = `${error?.message?.message || 'Unknown API Error'} - ${error.wpapi}`;
        errorData.object = new Error(message);
        errorData.object.name = 'InternalApiError';
      }
    }

    // Report 5xx errors to new relic
    if (statusCode >= 500 && global.newrelic) {
      global.newrelic.noticeError(errorData.object);
    }

    return errorData.props;
  }

  render() {
    const { error, router: { asPath } } = this.props;

    return (
      <Layout {...this.props} disableLayoutLeaderboardAd disableLayoutSkyscraperAd disableLayoutOOPAd>
        <style global jsx>{stylesheet}</style>
        <div className="inews__main__primary">
          <article className="error">
            {/* eslint-disable max-len */}
            <h1>{error?.statusCode === 404 ? 'Page Not Found' : 'Server Error'}</h1>
            <p>We are sorry to say that you have found our &apos;sorry&apos; page while visiting inews</p>
            <p>
              You may be attempting to get to a page that doesn&apos;t exist or our web gurus are currently trying to fix the issue.
            </p>
            <a href={asPath}>Click here to try again</a>
            <p>
              Alternatively if that fails and you return to this error page, please try the
              {' '}
              <a href="/">homepage</a>
              ,
              {' '}
              <a href="/news">news</a>
              {' '}
              or
              {' '}
              <a href="/sport">sport</a>
              {' '}
              section.
            </p>
            {/* eslint-enable max-len */}
          </article>
        </div>
      </Layout>
    );
  }
}

ErrorPage.propTypes = {
  error: PropTypes.objectOf(PropTypes.any).isRequired,
  router: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const config = { amp: true };
export default ErrorPage;
