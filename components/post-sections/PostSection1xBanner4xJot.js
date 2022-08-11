import React from 'react';
import PropTypes from 'prop-types';
import PostBanner from '../post-items/PostBanner';
import PostJot from '../post-items/PostJot';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection1xBanner4xJot component outputs 5 posts
 *
 * Desktop (min-width: 1024px):
 * ╔═══════════════════════╗
 * ║                       ║
 * ║      PostBanner       ║
 * ║                       ║
 * ╟─────┬─────┬─────┬─────╢
 * ║ Jot │ Jot │ Jot │ Jot ║
 * ╚═════╧═════╧═════╧═════╝
 *
 * Tablet (min-width: 768px):
 * ╔════════════════════╗
 * ║                    ║
 * ║     PostBanner     ║
 * ║                    ║
 * ╟──────────┬─────────╢
 * ║    Jot   │  Jot    ║
 * ╟──────────┼─────────╢
 * ║    Jot   │  Jot    ║
 * ╚══════════╧═════════╝
 *
 * Mobile:
 * ╔════════════╗
 * ║            ║
 * ║            ║
 * ║ PostBanner ║
 * ║            ║
 * ║            ║
 * ╟────────────╢
 * ║    Jot     ║
 * ╟────────────╢
 * ║    Jot     ║
 * ╟────────────╢
 * ║    Jot     ║
 * ╟────────────╢
 * ║    Jot     ║
 * ╚════════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostBanner'
 * @see '../post-items/PostJot'
 */

const PostSection1xBanner4xJot = (props) => {
  const {
    items, title, link, className, color,
  } = props;
  const p = dedupePostList(items, 5);
  return (
    p.length >= 1
      ? (
        <PostSectionWrapper type="PostSection1xBanner4xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostBanner key={p[0].id} post={p[0]} fromLayout="PostSection1xBanner4xJot" color={color} />
            {
              p.length > 1 && (
                p.slice(1, 5).map((individualPost) => (
                  <PostJot key={individualPost.id} post={individualPost} />
                ))
              )
            }
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xBanner4xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

PostSection1xBanner4xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
  color: 'white',
};

export default PostSection1xBanner4xJot;
