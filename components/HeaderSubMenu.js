import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import PageContext from './PageContext';
import ScopedColorContext from './ScopedColorContext';

// Categories that will appear on the post menu only when a story that’s in that category is being viewed.
// Consumer, Entertainment, Housing, Media, Analysis, Brexit, Comedy, Ethical Money, Food & Drink,
// Homes & Gardens, People, Shopping, Women, Work
const hiddenCategories = ['21537', '38', '40203', '7957', '37689', '21049', '40096', '39615', '68', '3875', '495', '25842', '19750', '66'];

const HeaderSubMenu = ({ menu, categories }) => {
  const context = useContext(PageContext);
  const { router, post } = context;

  const isPostPage = post !== undefined;
  const isAuthorPage = router.pathname === '/author';
  const [expended, setExpended] = useState(false);

  const onExpendMobileClick = () => {
    setExpended(!expended);
  };

  const colorKeys = [];
  let slug;
  let isNotInMenu = false;

  /**
 * Fetch primary category and other categories/list menu to display.
 *
 * @param {*} post
 * @param {*} context
 * @returns
 */
  const getCategoryInformation = () => {
    let parentMenu;
    let primaryCategoryId;
    let primaryInformation;
    let primaryCategory;
    let items;
    const author = post?.['co-authors']?.[0];

    if (post && post.breadcrumbs) {
      const colorList = post.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse();

      if (colorList) {
        colorKeys.concat(colorList);
      }
      primaryCategoryId = post.breadcrumbs?.[0]?.term_id;
      // Primary category for post
      primaryCategory = post.breadcrumbs.filter((category) => category.primary === true)?.[0];
    }

    if (context) {
      parentMenu = menu?.items.filter((item) => Number(item?.object_id) === Number(primaryCategory?.term_id))?.[0];
      if (!parentMenu) {
        parentMenu = menu?.items?.find((item) => {
          if (item.child_items) {
            const childMatched = item.child_items.find((child) => (Number(child.object_id) === primaryCategory?.term_id));
            return childMatched !== undefined;
          }
          return false;
        });
      }
    }

    if (parentMenu) {
      if (parentMenu?.child_items) {
        if (primaryCategory?.term_id === 12) {
          items = parentMenu?.child_items.filter((item) => hiddenCategories.indexOf(item.object_id.toString()) === -1 && item.post_name !== author.user_nicename);
        } else {
          items = parentMenu?.child_items.filter((item) => (hiddenCategories.indexOf(item.object_id.toString()) === -1 && Number(item.object_id) !== primaryCategory?.term_id ? primaryCategory?.term_id : primaryCategory?.parent));
        }
      }
    } else {
      // List Categories which are not in header menu
      parentMenu = menu?.items.filter((item) => Number(item?.object_id) === Number(primaryCategory?.parent))?.[0];
      items = parentMenu?.child_items.filter((item) => hiddenCategories.indexOf(item.object_id.toString()) === -1 && Number(item.object_id) !== primaryCategory?.parent);
    }

    if (primaryCategory?.term_id === 12) {
      primaryInformation = {
        link: author.link,
        title: author.display_name,
      };
    } else {
      primaryInformation = {
        link: primaryCategory?.link,
        title: primaryCategory?.name,
        slug: primaryCategory?.slug,
      };
    }
    return {
      parentMenu, primaryCategoryId, primaryInformation, items,
    };
  };

  const getSubnavInformation = () => {
    slug = router?.query?.slug || router?.asPath.split('/')[1];
    let menuInformation = {};

    if (slug) {
      let parentMenu;
      if (router.pathname === '/author') {
        // Fetch opinion nav item for author pages
        parentMenu = menu.items.find((item) => item.slug === 'opinion');
        menuInformation.items = parentMenu?.child_items.filter((child) => child?.post_name !== slug);
        const author = parentMenu?.child_items.find((child) => child.post_name === slug);
        menuInformation.primaryInformation = {
          link: author?.url,
          title: author?.title,
        };
      } else {
        // Fetch nav item based on slug
        parentMenu = menu.items.find((item) => item.slug === slug);
        if (!parentMenu) {
          parentMenu = menu?.items?.find((item) => {
            if (item.child_items) {
              const childMatched = item.child_items.find((child) => child.slug === slug);
              return childMatched !== undefined;
            }
            return false;
          });
        }
        if (parentMenu?.child_items) {
          menuInformation.items = parentMenu?.child_items;
        } else if (categories) {
          // List Categories which are not in header menu
          isNotInMenu = true;
          parentMenu = menu?.items.filter((item) => Number(item?.object_id) === categories[0]?.parent)?.[0];
          menuInformation.items = parentMenu?.child_items.filter((item) => hiddenCategories.indexOf(item.object_id.toString()) === -1 && Number(item.object_id) !== categories[0]?.parent);
        }
      }
      menuInformation = {
        ...menuInformation,
        parentMenu,
      };
    } if (post) {
      const {
        parentMenu, primaryCategoryId, primaryInformation, items,
      } = getCategoryInformation(post, context);

      menuInformation = {
        parentMenu,
        primaryCategoryId,
        primaryInformation,
        items,
      };
    }
    colorKeys.push(menuInformation?.parentMenu?.slug);
    return menuInformation;
  };

  const {
    items, primaryInformation, parentMenu,
  } = getSubnavInformation() || {};

  return (
    <>
      {items && (
        <ScopedColorContext colorKeys={colorKeys}>
          <div className={`inews__sub__header_menu ${expended ? 'expended' : 'collapsed'}`}>
            <div className=" inews__header__inner--cat">

              <div className="inews__sub__header_menu__parent-mobile">
                <a
                  href={parentMenu?.link}
                  title={parentMenu?.title}
                  className="inews__sub__header_menu__grand-parent-item"
                >
                  {parentMenu?.title}
                </a>
              </div>
              {isAuthorPage && (
                <div className="inews__sub__header_menu__primary-cat">{primaryInformation?.title}</div>
              )}
              {isPostPage && (
                <a
                  href={primaryInformation?.link}
                  key={primaryInformation?.link}
                  title={primaryInformation?.title}
                  className="inews__sub__header_menu_list_item inews__sub__header_menu_mobile_parent_item active"
                >
                  {primaryInformation?.title}

                </a>
              )}
              {
                isNotInMenu && (
                  <a
                    href={categories[0]?.link}
                    key={categories[0]?.link}
                    title={categories[0]?.name}
                    className="inews__sub__header_menu_list_item active"
                  >
                    {categories[0]?.name}

                  </a>
                )
              }

              {/* Show active link as first only in tablet and mobile */}
              {items?.filter((item) => item?.slug === slug).map((child) => (
                <a
                  href={child.url}
                  key={child.url}
                  title={child.title}
                  // eslint-disable-next-line no-template-curly-in-string
                  className={`inews__sub__header_menu_list_item inews__sub__header_menu_mobile_parent_item ${child?.slug === slug ? 'active' : ''}`}
                >
                  {child?.title}
                </a>
              ))}

              {items?.map((child) => (
                <a
                  href={child.url}
                  key={child.url}
                  title={child.title}
                  // eslint-disable-next-line no-template-curly-in-string
                  className={`inews__sub__header_menu_list_item ${(child?.slug === slug || (isPostPage && child?.slug === primaryInformation?.slug)) ? 'active' : ''}`}
                >
                  {child?.title}
                </a>
              ))}
            </div>
            <div className="inews__sub__header_menu__expend-mobile">
              {/* eslint-disable jsx-a11y/anchor-is-valid */}
              <a href="#" onClick={onExpendMobileClick}>{expended ? 'Less' : 'More'}</a>
            </div>
          </div>
        </ScopedColorContext>
      )}
    </>
  );
};

HeaderSubMenu.propTypes = {
  menu: PropTypes.objectOf(PropTypes.any),
  categories: PropTypes.arrayOf(PropTypes.any),
};

HeaderSubMenu.defaultProps = {
  menu: [],
  categories: [],
};

export default HeaderSubMenu;
