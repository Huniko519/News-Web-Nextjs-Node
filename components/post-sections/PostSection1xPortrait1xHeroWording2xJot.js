import React from 'react';
import PropTypes from 'prop-types';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';
import PostJot from '../post-items/PostJot';
import PostHeroWording from '../post-items/PostHeroWording';
import PostPortrait from '../post-items/PostPortrait';

/**
 * The PostSection1xPortrait1xHeroWording2xJot component outputs 3 posts as 1 PostPortrait component
 * 1 PostHeroWording, 2 PostJot components into the following layouts.
 *
 * Desktop (min-width: 1024px):
 * ╔════════╤═════════════╤════════╗
 * ║        │             │  Jot   ║
 * ║Portrait│ HeroWording ├────────╢
 * ║        │             │  Jot   ║
 * ╚════════╧═════════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔════════╤═════════════╤════════╗
 * ║        │             │  Jot   ║
 * ║Portrait│ HeroWording ├────────╢
 * ║        │             │  Jot   ║
 * ╚════════╧═════════════╧════════╝
 *
 * Mobile:
 * ╔═════════════╗
 * ║  Portrait   ║
 * ╟─────────────╢
 * ║ HeroWording ║
 * ║             ║
 * ╟─────────────╢
 * ║     Jot     ║
 * ╟─────────────╢
 * ║     Jot     ║
 * ╚═════════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostJot'
 * @see '../post-items/PostHeroWording'
 * @see '../post-items/PostPortrait'
 */
const PostSection1xPortrait1xHeroWording2xJot = (props) => {
  const {
    items, title, link, showAuthor, showPubDate, className,
  } = props;
  const p = dedupePostList(items, 4);

  return (
    p.length >= 3
      ? (
        <PostSectionWrapper type="PostSection1xPortrait1xHeroWording2xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostPortrait key={p[0].id} post={p[0]} />
            <PostHeroWording key={p[0].id} post={p[0]} showAuthor={showAuthor} showPubDate={showPubDate} />
            <PostJot key={p[1].id} post={p[1]} showAuthor={showAuthor} showPubDate={showPubDate} />
            <PostJot key={p[2].id} post={p[2]} showAuthor={showAuthor} showPubDate={showPubDate} />
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xPortrait1xHeroWording2xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  showAuthor: PropTypes.bool,
  showPubDate: PropTypes.bool,
};

PostSection1xPortrait1xHeroWording2xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
  showAuthor: false,
  showPubDate: false,
};

export default PostSection1xPortrait1xHeroWording2xJot;
