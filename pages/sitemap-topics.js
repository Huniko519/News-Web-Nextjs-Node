/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WP } from '../utils/wpapi';
import Layout from '../components/Layout';
import stylesheet from '../src/styles/pages/sitemap.scss';

class SitemapTopics extends Component {
  static async getInitialProps(context) {
    const { page } = context.query;
    let sitemapTopics = [];

    sitemapTopics = await WP
      .tags()
      .perPage(100)
      .page(page)
      .param('_fields', 'id,name,link')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.categories().perPage(100).param('_fields', 'id,name,link')
            .toString(),
          message: err,
        },
      }));

    const yoastHead = '<title>HTML Sitemap for Topics on iNews.co.uk</title><meta name="description" content="HTML Sitemap for Topics on iNews.co.uk"/>';

    return {
      sitemapTopics, page, yoastHead,
    };
  }

  render() {
    const {
      sitemapTopics, page,
    } = this.props;

    return (
      <Layout {...this.props}>
        <style global jsx>{stylesheet}</style>
        <div className="row">
          <div className="col-xs-12">
            <div className="box inews__archive__title">
              <h1>
                Sitemap for Topics - Page
                {' '}
                {page}
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 inews__main__primary">
            <div className="article-padding article-content">
              <h2>Topics</h2>
              <div className="row">
                {Array.isArray(sitemapTopics) && sitemapTopics.map((item) => (
                  <div className="col-xs-12 col-sm-6 col-md-4 inews__sitemap-entry" key={`sitemap-year-listItem-${item.id}`}>
                    <a
                      href={item.link}
                      title={item.name}
                      key={`anchor-${item.id}`}
                      aria-label="link for topic"
                      dangerouslySetInnerHTML={{
                        __html: item.name,
                      }}
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

SitemapTopics.propTypes = {
  sitemapTopics: PropTypes.arrayOf(PropTypes.object),
  yoastHead: PropTypes.string,
  page: PropTypes.number,
};

SitemapTopics.defaultProps = {
  sitemapTopics: [],
  yoastHead: '',
  page: 1,
};


export const config = { amp: true };
export default SitemapTopics;
