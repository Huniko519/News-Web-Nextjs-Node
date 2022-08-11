/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import { newsletterLists, updatedNewsLetterList } from '../components/newsletters/EmailUtils';
import { WP } from '../utils/wpapi';
import { getRelativePublicApiUrl } from '../utils/URL';
import NewsletterCard from '../components/newsletters/NewsletterCard';
import stylesheet from '../src/styles/pages/myaccount.scss';

// eslint-disable-next-line react/prefer-stateless-function
class MyAccount extends Component {
  // Server-side request to dummy email address for getting the latest link for newsletters
  static async getInitialProps() {
    const dummyUser = await WP.newsletterSubscriber()
      .param('email', 'dummysailthrusubscriber@inews.co.uk')
      .then((data) => data)
      .catch((err) => ({
        error: {
          wpapi: WP.newsletterSubscriber().param('email', 'dummysailthrusubscriber@inews.co.uk').toString(),
          message: err,
        },
      }));

    const updatedNewsLetter = updatedNewsLetterList(newsletterLists, dummyUser);
    return { updatedNewsLetter };
  }

  render() {
    const { updatedNewsLetter } = this.props;
    const xhrURL = `${getRelativePublicApiUrl()}/newsletter/subscriber/`;
    const premiumNewsletters = {};
    const freeNewsletters = {};

    Object.entries(updatedNewsLetter).forEach(([key, item]) => {
      if (item.subscriptionRequired) {
        premiumNewsletters[key] = item;
      } else {
        freeNewsletters[key] = item;
      }
    });

    return (
      <>
        <Layout {...this.props} disableLayoutLeaderboardAd disableLayoutSkyscraperAd disableLayoutOOPAd>
          <style global jsx>{stylesheet}</style>
          <div className="inews__main__primary">
            <amp-selector
              role="tablist"
              layout="container"
              class="newsletter-management__container"
            >
              <div
                role="tab"
                className="management__tab-button"
                selected
                option="a"
              >
                <span className="hide-on-mobile">Manage Newsletters</span>
                <span className="hide-on-desktop">Newsletters</span>
              </div>
              <div
                role="tabpanel"
                className="newsletter-management__content"
              >

                { /* do not show this until the user has been logged in */}
                <div className="inews__newsletter-management">
                  <div className="newsletter-management__header">
                    <h1>
                      Get the best of
                      {' '}
                      <span className="newsletter-management__header__i">i</span>
                      {' '}
                      news direct to your inbox.
                    </h1>
                  </div>
                  <form method="post" action-xhr={xhrURL} target="_top" custom-validation-reporting="show-first-on-submit" className="newsletter-management">
                    <div className="newsletter-management__email-wrapper">
                      <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                      <label className="newsletter-management__email-label" htmlFor="email">Select which newsletters you would like to receive to the following email address:</label>
                      <input type="email" name="email" id="email" placeholder="Please enter your email address" className="newsletter-management__email-input inews_email-textbox" required />
                      <span
                        visible-when-invalid="valueMissing"
                        validation-for="email"
                      >
                        Email address is required
                      </span>
                      <span
                        visible-when-invalid="typeMismatch"
                        validation-for="email"
                      >
                        Email address not valid
                      </span>
                      <input type="hidden" name="first_name" id="first_name" />
                      <input type="hidden" name="last_name" id="last_name" />
                      <input type="hidden" name="Piano_Customer_ID" id="Piano_Customer_ID" />
                      <input type="hidden" name="allowEditorialEmails" id="allowEditorialEmails" />
                    </div>

                    <h2>Subscriber newsletters</h2>
                    <h4>Get access to exclusive newsletters with your i subscription.</h4>
                    <div className="newsletter-management-cards-wrapper">
                      {
                        Object.entries(premiumNewsletters).map(([key, item]) => (
                          <NewsletterCard key={key} item={item} />
                        ))
                      }
                    </div>
                    <h2>Free newsletters</h2>
                    <h4>Click to select which newsletters you would like to receive.</h4>
                    <div className="newsletter-management-cards-wrapper">
                      {
                        Object.entries(freeNewsletters).map(([key, item]) => (
                          <NewsletterCard key={key} item={item} />
                        ))
                      }
                    </div>
                    <div className="newsletter-management__footer">
                      <input type="submit" value="Update Your Subscriptions" className="newsletter-management__footer__submit" id="inews__email-signup__submit__button" />
                      <div submit-success="true">
                        <template type="amp-mustache">
                          <span className="newsletter-management__success">Thank you for updating your newsletter preferences!</span>
                        </template>
                      </div>
                      <div submit-error="true">
                        <template type="amp-mustache">
                          <span className="newsletter-management__failure">Sorry, there was a problem with your update.</span>
                        </template>
                      </div>
                      <div className="newsletter-management__terms">
                        By clicking Update, you will be creating an account with i and agreeing to Associated Newspapers Ltd Standard
                        <a rel="noopener" href="/terms-and-conditions"> Terms and Conditions</a>
                        .
                        See our
                        {' '}
                        <a rel="noopener" href="/privacy-policy">Privacy Policy</a>
                        . You can change your preferences at any time.
                      </div>
                    </div>

                  </form>
                </div>

              </div>
              <div
                role="tab"
                id="management__tab-piano-account"
                name="account"
                className="management__tab-button piano"
                option="b"
              >
                <span className="hide-on-mobile">Create Account</span>
                <span className="hide-on-desktop">Account</span>
              </div>
              <div
                role="tabpanel"
                className="newsletter-management__content"
              >
                <div className="piano-management" />
                <button className="inews__logout" type="button">Log Out</button>
              </div>
            </amp-selector>
          </div>
        </Layout>
      </>
    );
  }
}

MyAccount.defaultProps = {
  yoastHead: '<meta name="robots" content="noindex">',
  updatedNewsLetter: {},
};

MyAccount.propTypes = {
  yoastHead: PropTypes.string,
  updatedNewsLetter: PropTypes.objectOf(PropTypes.any),
};

export const config = { amp: true };
export default MyAccount;
