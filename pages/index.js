/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WP } from '../utils/wpapi';
import Layout from '../components/Layout';
import Masthead from '../components/masthead/Masthead';
import PostSectionLayout from '../components/post-sections/PostSectionLayout';
import stylesheet from '../src/styles/pages/home.scss';

class HomePage extends Component {
  static async getInitialProps() {
    const yoast = await WP
      .yoast()
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.yoast().toString(),
          message: err,
        },
      }));

    if (yoast.error) {
      return { error: yoast.error };
    }

    const sidebar = await WP
      .sidebar()
      .id('home-layout-sidebar')
      .embed().then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.sidebar().id('home-layout-sidebar').toString(),
          message: err,
        },
      }));

    if (sidebar.error) {
      return { error: sidebar.error };
    }

    return { sidebar, yoastHead: yoast.head ?? '' };
  }

  render() {
    const { sidebar } = this.props;

    return (
      <Layout {...this.props}>
        <style global jsx>{stylesheet}</style>
        <Masthead />
        <PostSectionLayout sidebar={sidebar} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  sidebar: PropTypes.objectOf(PropTypes.any),
};

HomePage.defaultProps = {
  sidebar: {},
};

export const config = { amp: true };
export default HomePage;
