import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './styles.scss';
import Layout from '../../Layout';
import Config from '../../../config';

/* eslint-disable max-len */

/**
 * App page template
 *
 * @param {*} props
 */
const App = (props) => {
  const { post } = props;

  return (
    <Layout {...props} disableLayoutSkyscraperAd>
      <style global jsx>{stylesheet}</style>
      <div className="inews__main__primary">
        <article className={`id-${post.id} post-type-${post.type}`}>
          <div className="article-padding">
            <div className="top-app-wrapper">
              <div className="image-wrap">
                <div className="image-left first-img">
                  <amp-img layout="responsive" height="382" width="143" src={`${Config.feDomain}/static/images/pages/app/about_app_1.png`} />
                </div>
                <div className="image-left second-img">
                  <amp-img layout="responsive" height="430" width="161" src={`${Config.feDomain}/static/images/pages/app/about_app_2.png`} />
                </div>
              </div>
              <div>
                <h1>The i news app</h1>
                <h2>Tired of biased news, information overload and clickbait? Try inews UK - Britain’s best current affairs briefing.</h2>
                <h2 className="brand">TIME LIMITED OFFER: FREE until Jan 2022</h2>
                <p>Download the app for free by clicking the buttons below:</p>
                <span className="button-wrapper">
                  <a className="store-btn" href="https://apps.apple.com/gb/app/inews-uk/id1479545703" target="_blank" rel="noopener noreferrer nofollow">
                    <amp-img layout="responsive" width="169" height="48" src={`${Config.feDomain}/static/images/pages/app/app_store.png`} />
                  </a>
                  <a className="store-btn" href="https://play.google.com/store/apps/details?id=com.jpi.inews&amp;hl=en_GB" target="_blank" rel="noopener noreferrer nofollow">
                    <amp-img layout="responsive" width="169" height="48" src={`${Config.feDomain}/static/images/pages/app/google_play.png`} />
                  </a>
                </span>
              </div>
            </div>
            <div className="body-wrapper">
              <div className="app-item">
                <div className="app-circle">
                  <span className="three-x">3x</span>
                  <span>daily editions</span>
                </div>
                <h2>
                  The best of
                  {' '}
                  <span className="brand">i</span>
                </h2>
                <p>Enjoy three daily editions of the best journalism from i’s newsroom, packed with analysis, explainers, opinion and features.</p>
              </div>
              <div className="app-item">
                <div className="app-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="47.433" height="47.434" viewBox="0 0 47.433 47.434">
                    <path fill="#ffffff" d="M25.693,23.717V13.835H21.742V27.668H33.6V23.717H25.693ZM1.586,15.248A9.876,9.876,0,0,1,15.243,1.589,23.817,23.817,0,0,0,1.586,15.248Zm36.422,22.1a19.765,19.765,0,1,0-28.577,0L6,46.254a.857.857,0,0,0,1.271,1.032l7.078-6.17a19.784,19.784,0,0,0,18.748,0l7.08,6.17a.857.857,0,0,0,1.271-1.032Zm-14.29,2.18A15.811,15.811,0,1,1,39.534,23.713,15.829,15.829,0,0,1,23.718,39.524Zm20.857-36.6A9.887,9.887,0,0,0,32.187,1.587,23.82,23.82,0,0,1,45.849,15.244,9.885,9.885,0,0,0,44.576,2.921Z" transform="translate(-0.001 0)" />
                  </svg>
                </div>
                <h2>A news app that values your time</h2>
                <p>Our editions are ruthlessly curated, including only the best writing and most important news stories. No fluff, no clickbait, no time-wasting: just great journalism, every day.</p>
              </div>
              <div className="app-item">
                <div className="app-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="47.433" height="63.243">
                    <path d="M33.63 21.2L22.085 33l-5.837-5.6-3.257 3.265 9.094 8.859 14.807-15.06zM23.716 6.7a31.328 31.328 0 0018.446 6.37V38.3c0 8.016-4.443 10.085-18.446 18.728C9.726 48.392 5.27 46.318 5.27 38.3V13.07A31.316 31.316 0 0023.716 6.7zm0-6.7C14.833 7.552 9.265 7.905 0 7.905V38.3c0 12.131 8.44 15.3 23.716 24.943C38.992 53.6 47.433 50.431 47.433 38.3V7.905C38.167 7.905 32.6 7.552 23.716 0z" fill="#fff" />
                  </svg>
                </div>
                <h2>News you can trust</h2>
                <p>inews UK continues i’s long-standing commitment to unbiased, neutral reporting, always seeking to showcase opinions from both sides of the argument.</p>
              </div>
              <div className="app-item">
                <div className="app-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
                    <g data-name="Group 24">
                      <g data-name="Group 9" fill="#fff">
                        <path data-name="Subtraction 1" d="M60.934 79.224H34.535a5.285 5.285 0 01-5.28-5.279V21.152a5.285 5.285 0 015.28-5.279h26.4a5.285 5.285 0 015.28 5.279v9.658h-.006a16.627 16.627 0 00-5.274.853v-2.656h-26.4v37.019h26.4v-2.748a16.644 16.644 0 005.28.854v9.813a5.285 5.285 0 01-5.281 5.279zm-13.2-10.558a2.64 2.64 0 102.637 2.64 2.643 2.643 0 00-2.637-2.641zm-3.96-47.514a1.32 1.32 0 000 2.64h7.92a1.32 1.32 0 100-2.64z" />
                        <path d="M65.801 35.643a11.865 11.865 0 1011.865 11.865 11.866 11.866 0 00-11.865-11.865zm8.9 11.865a8.849 8.849 0 01-1.653 5.148L60.653 40.262A8.885 8.885 0 0174.7 47.508zm-17.8 0a8.849 8.849 0 011.654-5.148l12.393 12.393a8.884 8.884 0 01-14.046-7.245z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <h2>A distraction-free reading experience</h2>
                <p>We won’t spam you with notifications, publish unimportant articles or stuff our pages with ads. You can even read everything offline.</p>
              </div>
              <div className="app-item">
                <div className="app-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="55.964" height="27.982">
                    <path d="M41.966 27.982h-2.327c0-3.619.14-4.139-2.052-4.647-3.353-.774-6.522-1.5-7.679-4.032a4.86 4.86 0 01.361-4.447c2.381-4.5 2.978-8.355 1.637-10.582-1.567-2.6-6.312-2.612-7.893.04-1.343 2.257-.737 6.093 1.663 10.521a4.828 4.828 0 01.392 4.449c-1.143 2.539-4.281 3.265-7.606 4.029-2.29.529-2.145 1.014-2.145 4.668H14v-1.453c0-2.936.233-4.629 3.7-5.431 3.922-.907 7.8-1.716 5.935-5.151C18.111 5.769 22.052 0 27.978 0c5.811 0 9.857 5.557 4.354 15.948-1.807 3.414 1.921 4.225 5.935 5.151 3.474.8 3.705 2.5 3.705 5.44zm11.216-5.163c-3.006-.695-5.8-1.3-4.449-3.864C52.861 11.163 49.829 7 45.469 7c-2.95 0-5.242 1.905-5.242 5.422 0 2.959 1.338 5.072 2.108 6.821h2.444c-.4-1.749-3.418-5.974-1.786-8.712a3.13 3.13 0 014.93-.028c.886 1.471.422 4.225-1.245 7.371a4.193 4.193 0 00-.282 3.843c.711 1.553 2.278 2.3 4.05 2.817 3.514 1.028 3.19.1 3.19 3.451h2.324v-1.08c0-2.2-.173-3.479-2.782-4.081zM0 27.982h2.33c0-3.353-.324-2.423 3.19-3.451 1.775-.515 3.342-1.264 4.05-2.817a4.193 4.193 0 00-.282-3.843c-1.667-3.146-2.131-5.9-1.245-7.371a3.128 3.128 0 014.93.028c1.632 2.74-1.39 6.963-1.786 8.712h2.443c.77-1.749 2.108-3.862 2.108-6.821C15.74 8.9 13.448 7 10.5 7c-4.361 0-7.392 4.167-3.265 11.96 1.355 2.563-1.443 3.169-4.449 3.864C.173 23.421 0 24.7 0 26.9v1.08z" fill="#fff" />
                  </svg>
                </div>
                <h2>A news app for everyone</h2>
                <p>
                  We believe quality journalism should be accessible to all – so the i news app is free until Jan 2022, and you can cancel any time you change your mind.
                </p>
              </div>
              <div className="app-item">
                <div className="app-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" width="41.807" height="55.743">
                    <path d="M27.528 13.936h-.009a10.4 10.4 0 002.49-6.373C30.008 3.911 26.527 0 21.343 0s-8.661 3.911-8.661 7.562a10.414 10.414 0 002.49 6.373H0V29.1a4.822 4.822 0 002.722 4.738A4.673 4.673 0 007.8 32.531c2.894-3.015 6.136-.3 6.136 2.748 0 3-3.242 5.769-6.141 2.75a4.671 4.671 0 00-5.075-1.3A4.822 4.822 0 000 41.464v14.28h41.807V13.936zM4.645 51.1v-9.646a10.4 10.4 0 006.373 2.49c3.651 0 7.562-3.482 7.562-8.663s-3.91-8.661-7.561-8.661a10.414 10.414 0 00-6.373 2.49V18.581h10.516a4.824 4.824 0 004.738-2.72 4.675 4.675 0 00-1.305-5.08c-3.015-2.892-.3-6.136 2.748-6.136 3 0 5.769 3.245 2.75 6.141a4.671 4.671 0 00-1.3 5.075 4.822 4.822 0 004.738 2.72h9.634V51.1z" fill="#fff" />
                  </svg>
                </div>
                <h2>Take a break</h2>
                <p>Who doesn’t love a good puzzle? Interactive versions of our paper puzzles - including iDoku, Piecewords, Splitwords and Codewords are all included in the app.</p>
              </div>
            </div>
            <a className="inews-button" href="https://www.i-subscription.co.uk/nord/dm/INA/D/" target="_blank" rel="noopener noreferrer nofollow"> Subscribe now</a>
          </div>
        </article>
      </div>
    </Layout>
  );
};

App.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
