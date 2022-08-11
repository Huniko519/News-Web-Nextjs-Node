//

import React from 'react';
import PropTypes from 'prop-types';
import PostHero from '../post-items/PostHero';
import PostJot from '../post-items/PostJot';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection2xTeaser1xHero2xJot1xTeaser2xJot component outputs 8 posts
 *
 * Desktop (min-width: 1024px):
 * ╔════════╤═══════════════╤════════╗
 * ║        │               │        ║
 * ║ Teaser │               │ Teaser ║
 * ║        │     Hero      │        ║
 * ╟────────┤               ├────────╢
 * ║        │               │  Jot   ║
 * ║ Teaser ├───────┬───────┼────────╢
 * ║        │  Jot  │  Jot  │  Jot   ║
 * ╚════════╧═══════╧═══════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔════════╤════════╗
 * ║        │        ║
 * ║ Teaser │ Teaser ║
 * ║        │        ║
 * ╟────────┼────────╢
 * ║        │  Jot   ║
 * ║  Hero  ├────────╢
 * ║        │  Jot   ║
 * ╟────────┼────────╢
 * ║        │  Jot   ║
 * ║ Teaser ├────────╢
 * ║        │  Jot   ║
 * ╚════════╧════════╝
 *
 * Mobile:
 * ╔════════╗
 * ║ Teaser ║
 * ╟────────╢
 * ║ Teaser ║
 * ╟────────╢
 * ║        ║
 * ║  Hero  ║
 * ║        ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║ Teaser ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Jot   ║
 * ╚════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostHero'
 * @see '../post-items/PostTeaser'
 * @see '../post-items/PostJot'
 */
const PostSection2xTeaser1xHero2xJot1xTeaser2xJot = (props) => {
  const {
    items, title, link, className,
  } = props;
  const p = dedupePostList(items, 8);
  return (
    p.length === 8
      ? (
        <PostSectionWrapper type="PostSection2xTeaser1xHero2xJot1xTeaser2xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostTeaser key={p[0].id} post={p[0]} />
            <PostTeaser key={p[1].id} post={p[1]} />
            <PostHero key={p[2].id} post={p[2]} />
            <PostJot key={p[3].id} post={p[3]} />
            <PostJot key={p[4].id} post={p[4]} />
            <PostTeaser key={p[5].id} post={p[5]} />
            <PostJot key={p[6].id} post={p[6]} />
            <PostJot key={p[7].id} post={p[7]} />
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection2xTeaser1xHero2xJot1xTeaser2xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
};

PostSection2xTeaser1xHero2xJot1xTeaser2xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
};

export default PostSection2xTeaser1xHero2xJot1xTeaser2xJot;
