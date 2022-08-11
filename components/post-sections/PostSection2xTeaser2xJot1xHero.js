import React from 'react';
import PropTypes from 'prop-types';
import PostHero from '../post-items/PostHero';
import PostJot from '../post-items/PostJot';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection2xTeaser2xJot1xHero component outputs 5 posts
 *
 * Desktop (min-width: 1024px):
 * ╔════════╤════════╤════════╗
 * ║ Teaser │ Teaser │        ║
 * ║-------─┼─---────│  Hero  ║
 * ║  Jot   │  Jot   │        ║
 * ╚════════╧════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔════════════════════╗
 * ║  Teaser  │  Teaser ║
 * ╟──────────┼─────────╢
 * ║    Jot   │  Jot    ║
 * ╟──────────┴─────────╢
 * ║                    ║
 * ║        Hero        ║
 * ║                    ║
 * ╚════════════════════╝
 *
 * Mobile:
 * ╔═══════════╗
 * ║  Teaser   ║
 * ╟───────────╢
 * ║  Teaser   ║
 * ╟───────────╢
 * ║    Jot    ║
 * ╟───────────╢
 * ║    Jot    ║
 * ╟───────────╢
 * ║           ║
 * ║   Hero    ║
 * ║           ║
 * ╚═══════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostHero'
 * @see '../post-items/PostJot'
 * @see '../post-items/PostTeaser'
 */
const PostSection2xTeaser2xJot1xHero = (props) => {
  const {
    items, title, link, showAuthor, showPubDate, className,
  } = props;
  const p = dedupePostList(items, 5);

  const postItemTemplate = [
    PostTeaser,
    PostTeaser,
    PostJot,
    PostJot,
    PostHero,
  ];

  return (
    p.length > 0
      ? (
        <PostSectionWrapper type="PostSection2xTeaser2xJot1xHero" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            {p.map((post, i) => {
              const PostItem = postItemTemplate[i] ?? PostJot;
              return <PostItem key={post.id} post={post} showAuthor={showAuthor} showPubDate={showPubDate} />;
            })}
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection2xTeaser2xJot1xHero.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  showAuthor: PropTypes.bool,
  showPubDate: PropTypes.bool,
};

PostSection2xTeaser2xJot1xHero.defaultProps = {
  title: '',
  link: '',
  className: '',
  showAuthor: false,
  showPubDate: false,
};

export default PostSection2xTeaser2xJot1xHero;
