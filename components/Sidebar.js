import React from 'react';
import PropTypes from 'prop-types';
import PostsWidget from './widgets/PostsWidget';
import AuthorPostsWidget from './widgets/AuthorPostsWidget';
import MpuWidget from './widgets/MpuWidget';
import ScopedColorContext from './ScopedColorContext';

const widgetMap = {
  inews_mpu_widget: MpuWidget,
  inews_posts_widget: PostsWidget,
  inews_author_posts_widget: AuthorPostsWidget,
};

const colourContextWidgets = [
  'inews_author_posts_widget',
  'inews_posts_widget',
];

const Sidebar = (props) => {
  const { sidebar, context } = props;

  let widgetList = [];
  if (sidebar?._embedded?.widgets && sidebar._embedded.widgets.length > 0) {
    widgetList = sidebar._embedded.widgets.map((widget) => {
      if (widgetMap?.[widget.id_base]) {
        const Component = widgetMap[widget.id_base];
        const widgetProps = {
          widget,
          key: `widget_${widget.id}`,
        };

        // Show Author on Opinion Sidebar Posts
        if (widget.id_base === 'inews_posts_widget' && sidebar.id === 'opinion-post-sidebar') {
          widgetProps.showAuthor = true;
        }

        // ScopedColorContext
        if (colourContextWidgets.includes(widget.id_base) && context) {
          const colorKeys = context.breadcrumbs?.length && context.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse();

          return (
            <ScopedColorContext colorKeys={colorKeys || []} key={`${widgetProps.key}-color`}>
              <Component {...widgetProps} />
            </ScopedColorContext>
          );
        }

        return (<Component {...widgetProps} />);
      }
      return (
        <div
          className="box widget"
          dangerouslySetInnerHTML={{
            __html: widget.html,
          }}
          key={`widget_${widget.id}`}
        />
      );
    });
  }
  return (
    <aside className="inews__sidebar">
      <div className="inews__sidebar-inner">
        {widgetList}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  sidebar: PropTypes.objectOf(PropTypes.any).isRequired,
  context: PropTypes.objectOf(PropTypes.any),
};

Sidebar.defaultProps = {
  context: {},
};

export default Sidebar;
