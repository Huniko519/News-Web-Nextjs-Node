import React from 'react';
import PropTypes from 'prop-types';
import PostHeroBox from '../post-items/PostHeroBox';
import PostTeaser from '../post-items/PostTeaser';
import PostJot from '../post-items/PostJot';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection1xHeroBox4xTeaser4xJot component outputs 9 posts
 *
 * Desktop (min-width: 1024px):
 * ╔═══════════════════════════════════╗
 * ║                                   ║
 * ║             HeroBox               ║
 * ║                                   ║
 * ╟────────┬────────┬────────┬────────╢
 * ║ Teaser │ Teaser │ Teaser │ Teaser ║                                  ║
 * ╟────────┼────────┼────────┬────────╢
 * ║   Jot  │   Jot  │   Jot  │   Jot  ║
 * ╚════════╧════════╧════════╧════════╝
 *
 * Tablet (min-width: 768px):
 * ╔════════════════════╗
 * ║                    ║
 * ║       HeroBox      ║
 * ║                    ║
 * ╟──────────┬─────────╢
 * ║  Teaser  │ Teaser  ║
 * ╟──────────┼─────────╢
 * ║  Teaser  │ Teaser  ║
*  ╟──────────┼─────────╢
 * ║    Jot   │   Jot   ║
 * ╟──────────┼─────────╢
 * ║    Jot   │   Jot   ║
 * ╚══════════╧═════════╝
 *
 * Mobile:
 * ╔════════════╗
 * ║            ║
 * ║            ║
 * ║   HeroBox  ║
 * ║            ║
 * ║            ║
 * ╟────────────╢
 * ║   Teaser   ║
 * ╟────────────╢
 * ║   Teaser   ║
 * ╟────────────╢
 * ║   Teaser   ║
 * ╟────────────╢
 * ║   Teaser   ║
 * ╟────────────╢
 * ║     Jot    ║
 * ╟────────────╢
 * ║     Jot    ║
 * ╟────────────╢
 * ║     Jot    ║
 * ╟────────────╢
 * ║     Jot    ║
 * ╚════════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostHeroBox'
 * @see '../post-items/PostTeaser'
 * @see '../post-items/PostJot'
 */

const PostSection1xHeroBox4xTeaser4xJot = (props) => {
  const {
    items, title, link, className, color,
  } = props;
  const p = dedupePostList(items, 9);
  return (
    p.length >= 1
      ? (
        <PostSectionWrapper type="PostSection1xHeroBox4xTeaser4xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostHeroBox key={p[0].id} post={p[0]} fromLayout="PostSection1xHeroBox4xTeaser4xJot" color={color} showAuthor showQuote />
            {
              p.length > 1 && (
                p.slice(1, 5).map((individualPost) => (
                  <PostTeaser key={individualPost.id} post={individualPost} />
                ))
              )
            }
            {
              p.length > 5 && (
                p.slice(5).map((individualPost) => (
                  <PostJot key={individualPost.id} post={individualPost} />
                ))
              )
            }
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xHeroBox4xTeaser4xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

PostSection1xHeroBox4xTeaser4xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
  color: 'white',
};

export default PostSection1xHeroBox4xTeaser4xJot;
