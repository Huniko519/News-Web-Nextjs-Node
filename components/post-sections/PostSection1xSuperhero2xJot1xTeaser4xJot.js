import React from 'react';
import PropTypes from 'prop-types';
import PostSuperHero from '../post-items/PostSuperHero';
import PostJot from '../post-items/PostJot';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection1xSuperhero2xJot1xTeaser4xJot component outputs 8 posts
 *
 * Desktop (min-width: 1024px):
 * ╔═════════════════╤════════╗
 * ║                 │  Jot   ║
 * ║                 ├────────╢
 * ║    Superhero    │  Jot   ║
 * ║                 ├────────║
 * ║                 │ Teaser ║
 * ║                 │        ║
 * ╟─────┬─────┬─────┼────────╢
 * ║ Jot │ Jot │ Jot │  Jot   ║
 * ╚═════╧═════╧═════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔═══════════╤════════╗
 * ║           │        ║
 * ║           │ Teaser ║
 * ║ Superhero │        ║
 * ║           ├────────╢
 * ║           │  Jot   ║
 * ╟───────────┼────────╢
 * ║    Jot    │  Jot   ║
 * ╟───────────┼────────╢
 * ║    Jot    │  Jot   ║
 * ╚═══════════╧════════╝
 *
 * Mobile:
 * ╔═══════════╗
 * ║           ║
 * ║           ║
 * ║ Superhero ║
 * ║           ║
 * ║           ║
 * ╟───────────╢
 * ║    Jot    ║
 * ╟───────────╢
 * ║    Jot    ║
 * ╟───────────╢
 * ║           ║
 * ║  Teaser   ║
 * ║           ║
 * ╟───────────╢
 * ║    Jot    ║
 * ╟───────────╢
 * ║    Jot    ║
 * ╟───────────╢
 * ║    Jot    ║
 * ╟───────────╢
 * ║    Jot    ║
 * ╚═══════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostSuperHero'
 * @see '../post-items/PostTeaser'
 * @see '../post-items/PostJot'
 */
const PostSection1xSuperhero2xJot1xTeaser4xJot = (props) => {
  const {
    items, title, link, showAuthor, showPubDate, className,
  } = props;
  const p = dedupePostList(items, 8);

  return (
    p.length >= 4
      ? (
        <PostSectionWrapper type="PostSection1xSuperhero2xJot1xTeaser4xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostSuperHero key={p[0].id} post={p[0]} />
            <PostJot key={p[1].id} post={p[1]} />
            <PostJot key={p[2].id} post={p[2]} />
            <PostTeaser key={p[3].id} post={p[3]} showAuthor={showAuthor} showPubDate={showPubDate} />
            {
              p.length === 8 && (
                <>
                  <PostJot key={p[4].id} post={p[4]} />
                  <PostJot key={p[5].id} post={p[5]} />
                  <PostJot key={p[6].id} post={p[6]} />
                  <PostJot key={p[7].id} post={p[7]} />
                </>
              )
            }
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xSuperhero2xJot1xTeaser4xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  showAuthor: PropTypes.bool,
  showPubDate: PropTypes.bool,
};

PostSection1xSuperhero2xJot1xTeaser4xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
  showAuthor: false,
  showPubDate: false,
};

export default PostSection1xSuperhero2xJot1xTeaser4xJot;
