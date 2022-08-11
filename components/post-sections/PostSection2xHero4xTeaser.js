import React from 'react';
import PropTypes from 'prop-types';
import PostHero from '../post-items/PostHero';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection1xTeaser1xJot1xHero1xTeaser1xJot component outputs 5 posts
 *
 * Desktop (min-width: 1024px):
 * ╔═════════════════╤═════════════════╗
 * ║                 │                 ║
 * ║                 │                 ║
 * ║      Hero       │      Hero       ║
 * ║                 │                 ║
 * ║                 │                 ║
 * ╟────────┬────────┼────────┬────────╢
 * ║        │        │        │        ║
 * ║ Teaser │ Teaser │ Teaser │ Teaser ║
 * ║        │        │        │        ║
 * ╚════════╧════════╧════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔═════════════════╤═════════════════╗
 * ║                 │                 ║
 * ║                 │                 ║
 * ║      Hero       │      Hero       ║
 * ║                 │                 ║
 * ║                 │                 ║
 * ╟────────┬────────┼────────┬────────╢
 * ║        │        │        │        ║
 * ║ Teaser │ Teaser │ Teaser │ Teaser ║
 * ║        │        │        │        ║
 * ╚════════╧════════╧════════╧════════╝
 *
 * Mobile:
 * ╔════════╗
 * ║        ║
 * ║  Hero  ║
 * ║        ║
 * ╟────────╢
 * ║        ║
 * ║  Hero  ║
 * ║        ║
 * ╟────────╢
 * ║ Teaser ║
 * ╟────────╢
 * ║ Teaser ║
 * ╟────────╢
 * ║ Teaser ║
 * ╟────────╢
 * ║ Teaser ║
 * ╚════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostHero'
 * @see '../post-items/PostTeaser'
 */
const PostSection2xHero4xTeaser = (props) => {
  const {
    items, title, link, className,
  } = props;
  const p = dedupePostList(items, 6);
  return (
    p.length === 6
      ? (
        <PostSectionWrapper type="PostSection2xHero4xTeaser" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostHero key={p[0].id} post={p[0]} />
            <PostHero key={p[1].id} post={p[1]} />
            <PostTeaser key={p[2].id} post={p[2]} />
            <PostTeaser key={p[3].id} post={p[3]} />
            <PostTeaser key={p[4].id} post={p[4]} />
            <PostTeaser key={p[5].id} post={p[5]} />
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection2xHero4xTeaser.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
};

PostSection2xHero4xTeaser.defaultProps = {
  title: '',
  link: '',
  className: '',
};

export default PostSection2xHero4xTeaser;
