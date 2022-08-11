import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Config from '../config';
import ScopedColorContext from './ScopedColorContext';
import { getSVG as getLogoSVG } from '../utils/logo';
import PageContext from './PageContext';

const HamburgerMenu = (props) => {
  const { allMenus = [] } = props;
  if (!Array.isArray(allMenus)) {
    return null;
  }
  const menuIndex = allMenus.findIndex((element) => element.name === 'Hamburger Menu');
  const context = useContext(PageContext);
  const {
    router, categories, authors,
  } = context;
  const isAuthorPage = router.pathname === '/author';
  return (
    <amp-sidebar id="hamburger" layout="nodisplay" side="right">
      <div className="inews__header-hamburger-inner col-xs-12">
        <div className="inews__header-hamburger-header">
          <div className="inews__header__account">
            <a href="/my-account" aria-label="My Account" className="i__header__account_myaccount">
              <div className="i__header__account_login">
                Log In
                {' '}
                <span className="arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 31.143 31.143"
                  >
                    <g>
                      <path d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507
			c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08
			c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476
			l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z"
                      />
                    </g>
                  </svg>
                </span>
              </div>
              <svg
                className="i__header__account_myaccount_icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 88 94"
              >
                <g>
                  <path d="M44,0C32.4,0,23,9.4,23,21s9.4,21,21,21s21-9.4,21-21S55.6,0,44,0z M44,34c-7.2,0-13-5.8-13-13S36.8,8,44,8
		s13,5.8,13,13S51.2,34,44,34z"
                  />
                  <g>
                    <path d="M84,94H4c-2.2,0-4-1.8-4-4V72c0-7.9,5-15.3,13.7-20.4C21.8,46.7,32.5,44,44,44s22.2,2.7,30.3,7.6
			C83,56.6,88,64.1,88,72v18C88,92.2,86.2,94,84,94z M8,86h72V72c0-5-3.5-9.8-9.7-13.6C63.4,54.3,53.8,52,44,52
			c-10,0-19.3,2.3-26.3,6.4C11.5,62.2,8,67,8,72V86z"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </div>
          <a href="/" aria-label="Back to homepage" className="inews__header__logo">
            {getLogoSVG(true)}
          </a>
          <button type="button" on="tap:hamburger.close" className="inews__header__hamburger__button inews__hamburger-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="22.827" height="22.827" viewBox="0 0 22.827 22.827">
              <g id="Group_6097" data-name="Group 6097" transform="translate(-1237.272 -37.272)">
                <rect id="Rectangle_2581" data-name="Rectangle 2581" width="26.902" height="5.38" rx="2" transform="translate(1237.272 56.294) rotate(-45)" fill="#637581" />
                <rect id="Rectangle_2582" data-name="Rectangle 2582" width="26.902" height="5.38" rx="2" transform="translate(1241.077 37.272) rotate(45)" fill="#637581" />
              </g>
            </svg>
          </button>
        </div>
        <form className="inews__header__search" action={`${Config.feDomain}/search`} method="get" target="_top">
          <button className="inews__header__search__button" title="search" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
            </svg>
          </button>
          <input className="inews__header__search__input" type="text" name="q" placeholder="Search" />
        </form>
        <nav className="inews__header-hamburger-menu">
          <ul>
            {menuIndex > -1 && allMenus[menuIndex].items.map((item) => {
              const items = [];
              const childItems = [];

              const getColorKeyFromUrl = (navUrl) => {
                const url = new URL(navUrl);
                const slug = url.pathname.split('/')?.[1];
                return slug;
              };
              const colorKeys = item.slug || getColorKeyFromUrl(item?.url);
              if (item.child_items && item.child_items.length > 0) {
                // eslint-disable-next-line array-callback-return
                item.child_items.map((childItem) => {
                  childItems.push(
                    <li className="inews-menu-item" key={`link-${childItem.object_id}`}>
                      {
                        isAuthorPage
                          ? <a className={`inews-menu-item ${childItem?.post_title === authors?.[0]?.name ? 'active' : ''}`} href={childItem?.url} title={childItem.title}>{childItem.title}</a>
                          : <a className={`inews-menu-item ${childItem?.slug === categories?.[0]?.slug ? 'active' : ''}`} href={childItem.url} title={childItem.title}>{childItem.title}</a>
                      }
                    </li>,
                  );
                });
              }
              items.push(
                <li className="inews-menu-item" key={`link-${item.object_id}`}>
                  <div className={`inews__header-hamburger-section ${ (Number(item?.object_id) === categories?.[0]?.parent || (isAuthorPage && Number(item?.object_id) === 12)) ? 'open-section' : null}`} id={`hamburger-section-${item.object_id}`}>
                    <ScopedColorContext colorKeys={[colorKeys]} useDefault={false}>
                      <div className="inews__header-hamburger-section__header">
                        <a href={item.url} title={item.title}>
                          {item.title}
                        </a>
                        {childItems.length > 0 && (
                        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                          <span role="button" tabIndex="0" on={`tap:hamburger-section-${item.object_id}.toggleClass('class' = 'open-section')`}>
                            <span className="icon">&rsaquo;</span>
                          </span>
                        )}
                      </div>
                      {childItems.length > 0 && (
                        <ul className="inews__header-hamburger-section__list inews__subnav" key={`subnav-${item.object_id}`}>
                          {childItems}
                        </ul>
                      )}
                    </ScopedColorContext>
                  </div>
                </li>,
              );
              return items;
            })}
          </ul>
        </nav>
        <div className="inews__header-hamburger-footer">
          <ul>
            <li className="inews__header-hamburger-footer__contact">
              <a href="/contact-us">
                <span className="inews__header-hamburger-footer__icon">@</span>
                {' '}
                Contact us
              </a>
            </li>
            <li className="inews__header-hamburger-footer__newsletter">
              <a href="/my-account">
                <span className="inews__header-hamburger-footer__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20.967 20.967"><g><path style={{ fill: '#e33a11' }} d="M20.966,4.305c0-0.467-0.38-0.847-0.848-0.847H0.848C0.381,3.458,0,3.838,0,4.305v1.052   c0,0.042,0.004,0.081,0.009,0.115C0.004,5.505,0,5.538,0,5.572v11.09c0,0.467,0.38,0.846,0.848,0.846h19.271   c0.468,0,0.848-0.379,0.848-0.846V5.572c0-0.044-0.005-0.084-0.011-0.121c0.007-0.045,0.011-0.091,0.011-0.136L20.966,4.305   L20.966,4.305z M2.013,5.152h16.888l-8.419,6.1L2.013,5.152z M19.272,7.217v8.598H1.694V7.217l8.297,5.914   c0.289,0.207,0.697,0.205,0.984,0.002L19.272,7.217z" /></g></svg>
                </span>
                Sign up for newsletters
              </a>
            </li>
          </ul>
        </div>
      </div>
    </amp-sidebar>
  );
};

HamburgerMenu.propTypes = {
  allMenus: PropTypes.arrayOf(PropTypes.any),
};

HamburgerMenu.defaultProps = {
  allMenus: [],
};

export default HamburgerMenu;
