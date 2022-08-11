/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WP } from '../utils/wpapi';
import Layout from '../components/Layout';
import stylesheet from '../src/styles/pages/sitemap.scss';

class Sitemap extends Component {
  static async getInitialProps() {
    let sitemapCategories = [];
    const sitemapYears = [];
    const sitemapTopics = [];

    sitemapCategories = await WP
      .categories()
      .perPage(100)
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

    // Build an array of valid years for /year/NNNN
    const currentYear = new Date().getFullYear();
    let startYear = 2016;
    while (startYear <= currentYear) {
      sitemapYears.push(startYear);
      startYear += 1;
    }

    // Build an alpha array for the Topics
    for (let i = 1; i <= 64; i += 1) {
      sitemapTopics.push(i);
    }

    // hardcode some head meta tags since Yoast doesn't know about these sitemap pages
    const yoastHead = '<title>HTML Sitemap for iNews.co.uk</title><meta name="description" content="HTML Sitemap for iNews.co.uk"/>';

    return {
      sitemapCategories, sitemapYears, sitemapTopics, yoastHead,
    };
  }

  render() {
    const {
      sitemapCategories, sitemapYears, sitemapTopics,
    } = this.props;

    return (
      <Layout {...this.props}>
        <style global jsx>{stylesheet}</style>
        <div className="row">
          <div className="col-xs-12">
            <div className="box inews__archive__title">
              <h1>Sitemap</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 inews__main__primary">
            <div className="article-padding article-content">
              <h2>Categories</h2>
              <div className="row">
                {sitemapCategories.map((item) => (
                  <div className="col-xs-12 col-sm-6 col-md-3 inews__sitemap-entry" key={`sitemap-year-listItem-${item.id}`}>
                    <a
                      href={item.link}
                      title={item.name}
                      key={`anchor-${item.id}`}
                      aria-label="link for category"
                      dangerouslySetInnerHTML={{
                        __html: item.name,
                      }}
                    />
                  </div>
                ))}
              </div>
              <h2>Topics</h2>
              <div className="row">
                {sitemapTopics.map((item) => (
                  <div className="col-xs-12 col-sm-6 col-md-2 inews__sitemap-entry" key={`sitemap-topic-listItem-${item}`}>
                    <a
                      href={`/sitemap/topics/page/${item}`}
                      title="topic route for page"
                      key={`anchor-${item}`}
                      aria-label="link for topic"
                      dangerouslySetInnerHTML={{
                        __html: `Page ${item}`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <h2>Years</h2>
              <div className="row">
                {sitemapYears.map((item) => (
                  <div className="col-xs-12 col-sm-6 col-md-2 inews__sitemap-entry" key={`sitemap-year-listItem-${item}`}>
                    <a
                      href={`/year/${item}`}
                      title={`sitemap for ${item}`}
                      key={`anchor-${item}`}
                      aria-label="link for year"
                      dangerouslySetInnerHTML={{
                        __html: item,
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

Sitemap.propTypes = {
  sitemapCategories: PropTypes.arrayOf(PropTypes.object),
  sitemapYears: PropTypes.arrayOf(PropTypes.number),
  sitemapTopics: PropTypes.arrayOf(PropTypes.number),
  yoastHead: PropTypes.string,
};

Sitemap.defaultProps = {
  sitemapCategories: [],
  sitemapYears: [],
  sitemapTopics: [],
  yoastHead: '',
};


export const config = { amp: true };
export default Sitemap;
