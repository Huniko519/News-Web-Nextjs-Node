import React from 'react';
import PropTypes from 'prop-types';
import PostPodium from '../post-items/PostPodium';
import PostJot from '../post-items/PostJot';
import PostPuff from '../post-items/PostPuff';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSectionColumnists1xPodium2xTeaser1xPuff2xJot component outputs upto 6 posts
 *
 * It can output 3 or 6 posts.
 *
 * Desktop (min-width: 1024px):
 * ╔════════════╤════════╤════════╗
 * ║            │        │        ║
 * ║   Podium   │ Teaser │ Teaser ║
 * ║            │        │        ║
 * ╟────────────┼────────┼────────╢
 * ║    Puff    │  Jot   │  Jot   ║
 * ╚════════════╧════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔═════════════════╗
 * ║     Podium      ║
 * ╟────────┬────────╢
 * ║        │        ║
 * ║ Teaser │ Teaser ║
 * ║        │        ║
 * ╟────────┴────────╢
 * ║      Puff       ║
 * ╟────────┬────────╢
 * ║  Jot   │  Jot   ║
 * ╚════════╧════════╝
 *
 * Mobile:
 * ╔════════╗
 * ║ Podium ║
 * ╟────────╢
 * ║ Teaser ║
 * ╟────────╢
 * ║ Teaser ║
 * ╟────────╢
 * ║  Puff  ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Jot   ║
 * ╚════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostPodium'
 * @see '../post-items/PostTeaser'
 * @see '../post-items/PostPuff'
 * @see '../post-items/PostJot'
 */
const PostSectionColumnists1xPodium2xTeaser1xPuff2xJot = (props) => {
  const {
    items, title, link, className, showPubDate,
  } = props;
  const p = dedupePostList(items, 6);

  return (
    p.length >= 3
      ? (
        <PostSectionWrapper type="PostSectionColumnists1xPodium2xTeaser1xPuff2xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostPodium key={p[0].id} post={p[0]} />
            <PostTeaser key={p[1].id} post={p[1]} showAuthor showPubDate={showPubDate} />
            <PostTeaser key={p[2].id} post={p[2]} showAuthor showPubDate={showPubDate} />
            {
              p.length === 6
              && (
                <>
                  <PostPuff key={p[3].id} post={p[3]} showAuthor showPubDate={showPubDate} />
                  <PostJot key={p[4].id} post={p[4]} showAuthor showPubDate={showPubDate} />
                  <PostJot key={p[5].id} post={p[5]} showAuthor showPubDate={showPubDate} />
                </>
              )
            }
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSectionColumnists1xPodium2xTeaser1xPuff2xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  showPubDate: PropTypes.bool,
};

PostSectionColumnists1xPodium2xTeaser1xPuff2xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
  showPubDate: false,
};

export default PostSectionColumnists1xPodium2xTeaser1xPuff2xJot;
