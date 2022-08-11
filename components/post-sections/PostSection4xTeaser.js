import React from 'react';
import PropTypes from 'prop-types';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection4xTeaser component outputs 4 posts as PostTeaser components into the following
 * layouts.
 *
 * Desktop (min-width: 1024px):
 * ╔════════╤════════╤════════╤════════╗
 * ║        │        │        │        ║
 * ║ Teaser │ Teaser │ Teaser │ Teaser ║
 * ║        │        │        │        ║
 * ╚════════╧════════╧════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╒════════╤════════╕
 * │        │        │
 * │ Teaser │ Teaser │
 * │        │        │
 * ├────────┼────────┤
 * │        │        │
 * │ Teaser │ Teaser │
 * │        │        │
 * ╘════════╧════════╛
 *
 * Mobile:
 * ╒════════╕
 * │        │
 * │ Teaser │
 * │        │
 * ├────────┤
 * │        │
 * │ Teaser │
 * │        │
 * ├────────┤
 * │        │
 * │ Teaser │
 * │        │
 * ├────────┤
 * │        │
 * │ Teaser │
 * │        │
 * ╘════════╛
 *
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostTeaser'
 */
const PostSection4xTeaser = (props) => {
  const {
    items, title, link, className,
  } = props;
  const p = dedupePostList(items, 4);

  return (
    p.length > 0
      ? (
        <PostSectionWrapper type="PostSection4xTeaser" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            {p.map((post) => <PostTeaser key={post.id} post={post} />)}
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection4xTeaser.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
};

PostSection4xTeaser.defaultProps = {
  title: '',
  link: '',
  className: '',
};

export default PostSection4xTeaser;
