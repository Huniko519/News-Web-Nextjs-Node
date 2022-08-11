import React from 'react';
import PropTypes from 'prop-types';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';
import PostJot from '../post-items/PostJot';
import PostPortrait from '../post-items/PostPortrait';

/**
 * The PostSection1xPortrait3xJot component outputs 3 posts
 * 1 PostPortrait component
 * 3 PostJot components into the following layouts.
 *
 * Desktop (min-width: 1024px):
 * ╔════════════╤═══════╤════════╤════════╗
 * ║            │       │        │        ║
 * ║  Portrait  │  Jot  │  Jot   │  Jot   ║
 * ║            │       │        │        ║
 * ╚════════════╧═══════╧════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔════════════╤═══════╤════════╤════════╗
 * ║            │       │        │        ║
 * ║  Portrait  │  Jot  │  Jot   │  Jot   ║
 * ║            │       │        │        ║
 * ╚════════════╧═══════╧════════╧════════╝
 *
 * Mobile:
 * ╔══════════╤═════════╗
 * ║ Portrait │   Jot   ║
 * ║          │─────────╢
 * ║          │   Jot   ║
 * ║          │─────────╢
 * ║          │   Jot   ║
 * ╚══════════╧════════=╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostJot'
 * @see '../post-items/PostPortrait'
 */
const PostSection1xPortrait3xJot = (props) => {
  const {
    items, title, link, showPubDate, className,
  } = props;
  const p = dedupePostList(items, 3);

  return (
    p.length === 3
      ? (
        <PostSectionWrapper type="PostSection1xPortrait3xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostPortrait key={p[0].id} post={p[0]} />
            <PostJot key={p[0].id} post={p[0]} showPubDate={showPubDate} showCategory />
            <PostJot key={p[1].id} post={p[1]} showPubDate={showPubDate} showCategory />
            <PostJot key={p[2].id} post={p[2]} showPubDate={showPubDate} showCategory />
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xPortrait3xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  showPubDate: PropTypes.bool,
};

PostSection1xPortrait3xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
  showPubDate: false,
};

export default PostSection1xPortrait3xJot;
