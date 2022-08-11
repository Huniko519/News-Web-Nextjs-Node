import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ScopedColorContext from './ScopedColorContext';
import PageContext from './PageContext';
// import HeaderSubMenu from './HeaderSubMenu';

const HeaderMenu = (props) => {
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

  /**
   * Generate the relevant menu item classnames dependant on page context
   * and the current menu item relating to the page we're on.
   */
  const getMenuItemclassNames = (item) => {
    const classNameBase = 'inews-menu-item';
    const classNames = [classNameBase];
    const { current, menu } = data;
    /* eslint-disable-next-line array-callback-return, consistent-return */
    const topLevelMenuItemCatIds = menu.items.map((i) => { if (i.object === 'category') { return parseInt(i.object_id, 10); } });

    // Adding current class and required information in current object
    const setItemAsActive = () => {
      classNames.push(`${classNameBase}-current`);
      current.menuId = item.ID;
      current.ancestorId = parseInt(item.menu_item_parent, 10);
    };

    classNames.push(`${classNameBase}-${item.object}`);

    if (item.child_items && item.child_items.length > 0) {
      classNames.push(`${classNameBase}-has-children`);
    }

    if (current.ancestorId === item.ID) {
      classNames.push(`${classNameBase}-current-ancestor`);
    }

    const { router, post } = context;

    // Only adding current menu classes for category object menu items
    if (item.object === 'category') {
      // If we're on the /category template match on the id of current category
      if (router.pathname === '/category' || router.pathname === '/post') {
        const targetMatch = { id: false, parent: false };
        if (router.pathname === '/post') {
          if (post?.breadcrumbs && post.breadcrumbs.length > 0) {
            /*
                * Aim to match on sub category.
                * breadcrumbs[0] === parent category
                * breadcrumbs[1] === sub category
                */
            const match = post.breadcrumbs[1] ? post.breadcrumbs[1] : post.breadcrumbs[0];
            targetMatch.id = match.term_id;
            targetMatch.parent = match.parent;
          }
        } else if (categories?.[0]) {
          targetMatch.id = categories[0].id;
          targetMatch.parent = categories[0].parent;
        }

        if (targetMatch.id) {
          let matched = false;

          // Direct match for category id
          if (targetMatch.id === parseInt(item.object_id, 10)) {
            matched = true;
          }

          // Checking match for category parent id
          if (targetMatch.parent
              // - Can't match as current if item already flagged as ancestor
              && item.ID !== current.ancestorId
              // - Does parent category id match menu object id
              && targetMatch.parent === parseInt(item.object_id, 10)
              // - Don't match parent as current if child cat is a top level item e.g. politics || money
              && !topLevelMenuItemCatIds.includes(targetMatch.id)
          ) {
            matched = true;
          }

          if (matched) {
            setItemAsActive();
          }
        }
      }
    } else {
      // Matching the first element in url with item.slug
      // Capture non category pages like puzzles/ and puzzles-category/
      const routerPathName = router.asPath.split('/')[1];
      if (routerPathName === item.slug || routerPathName.indexOf(item.slug) > -1) {
        setItemAsActive();
      }
    }

    return classNames.join(' ');
  };

  /**
   * Builds the JSX for menu items
   */
  const buildMenuItems = () => {
    const { menu } = data;
    // If 'Header Menu' doesn't exist return empty element array
    if (!menu) {
      return [];
    }

    const items = [];

    menu.items.forEach((item) => {
      const children = [];

      if (item.child_items && item.child_items.length > 0) {
        // eslint-disable-next-line array-callback-return
        item.child_items.forEach((child) => {
          children.push(
            <li className={getMenuItemclassNames(child)} key={`link-${child.object_id}`}>
              <a href={child.url} title={child.title}>
                <span>{child.title}</span>
              </a>
            </li>,
          );
        });
      }

      items.push(
        <li className={getMenuItemclassNames(item)} key={`link-${item.object_id}`}>
          <ScopedColorContext colorKeys={[item.slug || '']}>
            <a className="inews__header-menu__top-level-link" href={item.url} title={item.title}><span>{item.title}</span></a>
          </ScopedColorContext>
        </li>
        ,
      );
    });

    return items;
  };

  return (
    <nav className="inews__header-menu">
      <ul>
        {buildMenuItems()}
      </ul>
    </nav>
  );
};

HeaderMenu.propTypes = {
  allMenus: PropTypes.arrayOf(PropTypes.any),
};

HeaderMenu.defaultProps = {
  allMenus: [],
};

export default HeaderMenu;
