import React from 'react';
import PropTypes from 'prop-types';
import PostHero from '../post-items/PostHero';
import PostJot from '../post-items/PostJot';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection1xTeaser1xJot1xHero1xTeaser1xJot component outputs 5 posts
 *
 * Desktop (min-width: 1024px):
 * ╔════════╤════════╤════════╗
 * ║        │        │        ║
 * ║ Teaser │        │ Teaser ║
 * ║        │  Hero  │        ║
 * ╟────────┤        ├────────╢
 * ║  Jot   │        │  Jot   ║
 * ╚════════╧════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔════════╤════════╗
 * ║        │  Jot   ║
 * ║  Hero  ├────────╢
 * ║        │  Jot   ║
 * ╟────────┼────────╢
 * ║        │        ║
 * ║ Teaser │ Teaser ║
 * ║        │        ║
 * ╚════════╧════════╝
 *
 * Mobile:
 * ╔════════╗
 * ║        ║
 * ║ Teaser ║
 * ║        ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║        ║
 * ║  Hero  ║
 * ║        ║
 * ╟────────╢
 * ║        ║
 * ║ Teaser ║
 * ║        ║
 * ╟────────╢
 * ║  Jot   ║
 * ╚════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostHero'
 * @see '../post-items/PostTeaser'
 * @see '../post-items/PostJot'
 */
const PostSection1xTeaser1xJot1xHero1xTeaser1xJot = (props) => {
  const {
    items, title, link, className,
  } = props;
  const p = dedupePostList(items, 5);
  return (
    p.length === 5
      ? (
        <PostSectionWrapper type="PostSection1xTeaser1xJot1xHero1xTeaser1xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostTeaser key={p[0].id} post={p[0]} />
            <PostJot key={p[1].id} post={p[1]} />
            <PostHero key={p[2].id} post={p[2]} />
            <PostTeaser key={p[3].id} post={p[3]} />
            <PostJot key={p[4].id} post={p[4]} />
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xTeaser1xJot1xHero1xTeaser1xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
};

PostSection1xTeaser1xJot1xHero1xTeaser1xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
};

export default PostSection1xTeaser1xJot1xHero1xTeaser1xJot;
