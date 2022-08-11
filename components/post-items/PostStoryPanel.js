import React from 'react';
import PropTypes from 'prop-types';
import PostItemMedia from './PostItemMedia';
import PostItemBadge from './PostItemBadge';
import PostItemTitle from './PostItemTitle';

/**
 * The PostStoryPanel component outputs 4 posts
 *
 * Desktop (min-width: 1024px):
 * ╔══════════╗
 * ║          ║
 * ║  Image   ║
 * ║          ║
 * ╟──────────╢
 * ║ Headline ║
 * ╟──────────╢
 * ║ Headline ║
 * ╟──────────╢
 * ║ Headline ║
 * ╟──────────╢
 * ║ Headline ║
 * ╚══════════╝
 *
 * Tablet (min-width: 768px):
 * ╔══════════╗
 * ║          ║
 * ║  Image   ║
 * ║          ║
 * ╟──────────╢
 * ║ Headline ║
 * ╟──────────╢
 * ║ Headline ║
 * ╟──────────╢
 * ║ Headline ║
 * ╟──────────╢
 * ║ Headline ║
 * ╚══════════╝
 *
 * Mobile:
 * ╔═══════╤══════════╗
 * ║       │          ║
 * ║ Image │ Headline ║
 * ║       │          ║
 * ╟───────┴──────────╢
 * ║  Headline        ║
 * ╟──────────────────╢
 * ║  Headline        ║
 * ╟──────────────────╢
 * ║  Headline        ║
 * ╚══════════════════╝
 *
 * @param {posts: [...posts]} props
 */
const PostStoryPanel = (props) => {
  const { posts, panelLabel, panelLabelLink } = props;

  return (
    <div className="inews__post inews__post-storypanel">
      <div className="inews__post-storypanel__content">

        <div className="inews__post-storypanel__content_non-mobile">
          <PostItemMedia
            className="inews__post-storypanel__media"
            imageSize="medium-16:9"
            width={16}
            height={9}
            layout="responsive"
            placeholder="/static/images/placeholder/placeholder-640x360.png"
            post={posts[0]}
          />
          <PostItemBadge post={posts[0]} panelLabel={panelLabel} panelLabelLink={panelLabelLink} />
          <div className="inews__post-storypanel__headline" key={posts[0].id} data-post-id={posts[0].id}>
            <div className="inews__post-storypanel__headline_square" />
            <PostItemTitle post={posts[0]} />
          </div>
        </div>

        <div className="inews__post-storypanel__content_mobile">
          <PostItemMedia
            className="inews__post-storypanel__content_mobile_media"
            imageSize="medium-1:1"
            width={155}
            height={155}
            layout="responsive"
            placeholder="/static/images/placeholder/placeholder-84x84.png"
            post={posts[0]}
          />
          <div className="inews__post-storypanel__content_mobile_text">
            <PostItemBadge post={posts[0]} panelLabel={panelLabel} panelLabelLink={panelLabelLink} />
            <div className="inews__post-storypanel__headline" key={posts[0].id} data-post-id={posts[0].id}>
              <div className="inews__post-storypanel__headline_square" />
              <PostItemTitle post={posts[0]} />
            </div>
          </div>
        </div>

        {posts.slice(1, 4).map((post) => (
          <div className="inews__post-storypanel__headline" key={post.id} data-post-id={post.id}>
            <div className="inews__post-storypanel__headline_border" />
            <div className="inews__post-storypanel__headline_square" />
            <PostItemTitle post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* istanbul ignore next */
PostStoryPanel.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  panelLabel: PropTypes.string,
  panelLabelLink: PropTypes.string,
};

PostStoryPanel.defaultProps = {
  panelLabel: '',
  panelLabelLink: '',
};

export default PostStoryPanel;
