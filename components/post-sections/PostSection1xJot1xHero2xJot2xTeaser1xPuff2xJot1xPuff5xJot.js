import React from 'react';
import PropTypes from 'prop-types';
import PostHero from '../post-items/PostHero';
import PostJot from '../post-items/PostJot';
import PostPuff from '../post-items/PostPuff';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot component outputs up to 15 posts
 *
 * This section will render with 8, 11 or 15 posts depending on how many are left after deduping.
 *
 * Desktop (min-width: 1024px):
 * ╔════════╤═════════════════╤════════╗
 * ║  Jot   │                 │  Jot   ║
 * ╟────────┤                 ├────────╢
 * ║  Jot   │      Hero       │        ║
 * ╟────────┤                 │ Teaser ║
 * ║        │                 │        ║
 * ║ Teaser ├─────────────────┼────────╢
 * ║        │      Puff       │  Jot   ║
 * ╟────────┼─────────────────┼────────╢
 * ║  Jot   │      Puff       │  Jot   ║
 * ╟────────┼────────┬────────┼────────╢
 * ║  Jot   │   Jot  │   Jot  │  Jot   ║
 * ╚════════╧════════╧════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔════════╤════════╗
 * ║  Jot   │  Jot   ║
 * ╟────────┼────────╢
 * ║        │  Jot   ║
 * ║        ├────────╢
 * ║        │        ║
 * ║  Hero  │        ║
 * ║        │ Teaser ║
 * ║        │        ║
 * ║        │        ║
 * ╟────────┼────────╢
 * ║        │  Jot   ║
 * ║        ├────────╢
 * ║ Teaser │  Jot   ║
 * ║        ├────────╢
 * ║        │  Jot   ║
 * ╟────────┼────────╢
 * ║  Puff  │  Puff  ║
 * ╟────────┼────────╢
 * ║  Jot   │  Jot   ║
 * ╟────────┼────────╢
 * ║  Jot   │  Jot   ║
 * ╚════════╧════════╝
 *
 * Mobile:
 * ╔════════╗
 * ║  Jot   ║
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
 * ║ Teaser ║
 * ╟────────╢
 * ║  Puff  ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Puff  ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Jot   ║
 * ╟────────╢
 * ║  Jot   ║
 * ╚════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostHero'
 * @see '../post-items/PostTeaser'
 * @see '../post-items/PostPuff'
 * @see '../post-items/PostJot'
 */
const PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot = (props) => {
  const {
    items, title, link, className,
  } = props;
  const p = dedupePostList(items, 15);

  return (
    p.length >= 8
      ? (
        <PostSectionWrapper type="PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostJot key={p[0].id} post={p[0]} />
            <PostHero key={p[1].id} post={p[1]} />
            <PostJot key={p[2].id} post={p[2]} />
            <PostJot key={p[3].id} post={p[3]} />
            <PostTeaser key={p[4].id} post={p[4]} />
            <PostTeaser key={p[5].id} post={p[5]} />
            <PostPuff key={p[6].id} post={p[6]} />
            <PostJot key={p[7].id} post={p[7]} />
            { p.length >= 11
            && (
            <>
              <PostJot key={p[8].id} post={p[8]} />
              <PostPuff key={p[9].id} post={p[9]} />
              <PostJot key={p[10].id} post={p[10]} />
              {
                 p.length === 15
                 && (
                 <>
                   <PostJot key={p[11].id} post={p[11]} />
                   <PostJot key={p[12].id} post={p[12]} />
                   <PostJot key={p[13].id} post={p[13]} />
                   <PostJot key={p[14].id} post={p[14]} />
                 </>
                 )
              }
            </>
            )}

          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
};

PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
};

export default PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot;
