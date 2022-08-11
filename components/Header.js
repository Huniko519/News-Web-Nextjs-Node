import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import HamburgerMenu from './HamburgerMenu';
import HeaderMenu from './HeaderMenu';
import HeaderSubMenu from './HeaderSubMenu';
import Config from '../config';
import BackToTop from './BackToTop';
import { getSVG as getLogoSVG } from '../utils/logo';
import PageContext from './PageContext';

const Header = (props) => {
  const { allMenus = [] } = props;
  const index = allMenus.findIndex((element) => element.name === 'Header Menu');
  const context = useContext(PageContext);
  const { categories } = context;
  const data = {
    current: {
      menuId: false,
      ancestorId: false,
    },
    menu: index > -1 ? allMenus[index] : false,
  };
  return (
    <>
      <HamburgerMenu {...props} />
      <BackToTop.Target />
      <div className="inews__header">
        <div className="inews__header__inner">
          <div className="i__header__account">
            <a href="/my-account?ico=signup_account_icon" aria-label="My Account" className="i__header__account_myaccount">
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
            <a href="/subscribe?ico=button_header_subscribe" aria-label="Register" className="i__header__account_register">
              Subscribe
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
            </a>
          </div>
          <a href="/" aria-label="Back to homepage" className="inews__header__logo">
            {getLogoSVG(true)}
          </a>
          <HeaderMenu {...props} />
          <form className="inews__header__search" action={`${Config.feDomain}/search`} method="get" target="_top">
            <a className="inews__header__search__button" title="search" on="tap:inews__header__search__input.toggleVisibility">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" />
              </svg>
            </a>
            <input className="inews__header__search__input" id="inews__header__search__input" type="text" name="q" placeholder="Search" hidden />
          </form>
          <button type="button" on="tap:hamburger" className="inews__header__hamburger__button inews__hamburger-open">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
              <g id="Group_6107" data-name="Group 6107" transform="translate(-1235 -35)">
                <rect id="Rectangle_2581" data-name="Rectangle 2581" width="26" height="6" rx="2" transform="translate(1235 35)" fill="#637581" />
                <rect id="Rectangle_2582" data-name="Rectangle 2582" width="26" height="6" rx="2" transform="translate(1235 55)" fill="#637581" />
                <rect id="Rectangle_2583" data-name="Rectangle 2583" width="26" height="6" rx="2" transform="translate(1235 45)" fill="#637581" />
              </g>
            </svg>
          </button>
        </div>
        <HeaderSubMenu menu={data?.menu} categories={categories || null} />
      </div>
    </>
  );
};
Header.propTypes = {
  allMenus: PropTypes.arrayOf(PropTypes.any),
};

Header.defaultProps = {
  allMenus: [],
};

export default Header;
