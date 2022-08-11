import React from 'react';
import PropTypes from 'prop-types';
import DocHead from '../../DocHead';
import HamburgerMenu from '../../HamburgerMenu';
import stylesheet from './styles.scss';
import PostContent from '../../PostContent';
import Footer from '../../Footer';
import { getStaticDomain } from '../../../utils/URL';
import { getSVG as getLogoSVG } from '../../../utils/logo';


/* eslint-disable max-len */

/**
 * Subscribe page template
 *
 * @param {*} props
 */
const MoneySolutions = (props) => {
  const { post } = props;
  const staticDomain = getStaticDomain();

  const iframeSrc = post.money_solutions_iframe?.src ? post.money_solutions_iframe.src : 'https://www.agepartnership.co.uk/mcx/equity-release/do:landing/mc0:InboundReferral/mc1:DMG-MailFinance/mc2:CalculatorWidget/';
  const iframeTitle = post.money_solutions_iframe?.title ? post.money_solutions_iframe.title : 'How much equity could you release? Use our free calculator';
  const iframeID = (iframeSrc.includes('CalculatorWidget')) ? 'ap-eqr-calculator' : 'ap-eqr-brochure';
  return (
    <>
      <DocHead {...props} />
      <script async src={`${staticDomain}/AgePartnershipIframe.js`} />
      <HamburgerMenu {...props} />
      <div className="inews__header row middle-xs inews__money-solutions-page__header">
        <div className="col-xs-12 inews__header-inner">
          <div className="box">
            <div className="row middle-xs">
              <div className="col-xs-7 col-sm-5">
                <div className="col-xs-12 row middle-xs">
                  <a href="/" aria-label="Back to homepage" className="inews__hamburger-logo">
                    {getLogoSVG()}
                  </a>
                  <button type="button" on="tap:hamburger" className="inews__hamburger-open">&#9776;</button>
                  <img alt="money solutions logo" width="200" src="data:image/png;base64,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" />
                </div>
              </div>
              <div className="col-xs-5 col-sm-7 end-xs">
                <div className="box">
                  <p>
                    <strong><a href="tel:+4408082396638">0808 239 6638</a></strong>
                    <br />
                    <span>Call free to find out how much tax-free cash you could release</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inews__main row inews__money-solutions-page">
        <div className="col-xs-12">
          <div className="box">
            <style global jsx>{stylesheet}</style>
            <div className="row reverse">
              <div className="col-xs-12 col-md-6">
                <aside className="inews__sidebar row">
                  <div className="inews__sidebar-inner">
                    <div className="widget box">
                      <h2>{iframeTitle}</h2>
                      <iframe
                        id={iframeID}
                        data-widget-namespace="apwidget"
                        data-widget-src={iframeSrc}
                        layout="responsive"
                        resizable="true"
                        width="100%"
                        height="1100"
                        frameBorder="0"
                        scrolling="no"
                        title="Money Solutions Form"
                      />
                    </div>
                  </div>
                </aside>
              </div>
              <div className="col-xs-12 col-md-6 inews__main__primary">
                <div className="box">
                  <article className={`id-${post.id} post-type-${post.type}`}>
                    <div className="article-padding">
                      <h1
                        className="headline"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                    </div>
                    <div className="article-padding article-content">
                      <PostContent content={post.content.rendered} />
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer {...props} />
    </>
  );
};


MoneySolutions.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MoneySolutions;
