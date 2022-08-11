import React from 'react';
import PropTypes from 'prop-types';
import PostHeroBox from '../post-items/PostHeroBox';
import PostTeaser from '../post-items/PostTeaser';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection1xHeroBox4xTeaser component outputs 5 posts
 *
 * Desktop (min-width: 1024px):
 * ╔═══════════════════════════════════╗
 * ║                                   ║
 * ║             HeroBox               ║
 * ║                                   ║
 * ╟────────┬────────┬────────┬────────╢
 * ║ Teaser │ Teaser │ Teaser │ Teaser ║
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
 * ╚════════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostHeroBox'
 * @see '../post-items/PostJot'
 */

const PostSection1xHeroBox4xTeaser = (props) => {
  const {
    items, title, link, className, color,
  } = props;
  const p = dedupePostList(items, 5);
  return (
    p.length >= 1
      ? (
        <PostSectionWrapper type="PostSection1xHeroBox4xTeaser" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostHeroBox key={p[0].id} post={p[0]} fromLayout="PostSection1xHeroBox4xTeaser" color={color} />
            {
              p.length > 1 && (
                p.slice(1, 5).map((individualPost) => (
                  <PostTeaser key={individualPost.id} post={individualPost} />
                ))
              )
            }
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xHeroBox4xTeaser.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

PostSection1xHeroBox4xTeaser.defaultProps = {
  title: '',
  link: '',
  className: '',
  color: 'white',
};

export default PostSection1xHeroBox4xTeaser;
