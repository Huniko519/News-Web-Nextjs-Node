import React from 'react';
import PropTypes from 'prop-types';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

import PostInvertedHero from '../post-items/PostInvertedHero';
import PostJot from '../post-items/PostJot';
import PostStoryPanel from '../post-items/PostStoryPanel';

/**
 * The PostSection1xInvertedHero1xStoryPanel3xJot component outputs 8 posts
 *
 * Desktop (min-width: 1024px):
 * ╔═════════════════╤══════════╗
 * ║                 │          ║
 * ║   InvertedHero  │          ║
 * ║                 │StoryPanel║
 * ╟─────┬─────┬─────┤          ║
 * ║ Jot │ Jot │ Jot │          ║
 * ╚═════╧═════╧═════╧══════════╝
 *
 * Tablet (min-width: 768px):
 * ╔═════════════════╤══════════╗
 * ║                 │          ║
 * ║   InvertedHero  │          ║
 * ║                 │StoryPanel║
 * ╟─────┬─────┬─────┤          ║
 * ║ Jot │ Jot │ Jot │          ║
 * ╚═════╧═════╧═════╧══════════╝
 *
 * Mobile:
 * ╔════════════╗
 * ║            ║
 * ║            ║
 * ║InvertedHero║
 * ║            ║
 * ║            ║
 * ╟────────────╢
 * ║            ║
 * ║            ║
 * ║ StoryPanel ║
 * ║            ║
 * ║            ║
 * ╟────────────╢
 * ║    Jot     ║
 * ╟────────────╢
 * ║    Jot     ║
 * ╟────────────╢
 * ║    Jot     ║
 * ╚════════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostInvertedHero'
 * @see '../post-items/PostStoryPanel'
 * @see '../post-items/PostJot'
 */
const PostSection1xInvertedHero1xStoryPanel3xJot = (props) => {
  const {
    items, title, link, className, panelLabel, panelLabelLink,
  } = props;

  const p = dedupePostList(items, 8);
  return (
    p.length >= 4
      ? (
        <PostSectionWrapper type="PostSection1xInvertedHero1xStoryPanel3xJot" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostInvertedHero key={p[0].id} post={p[0]} />
            <PostJot key={p[1].id} post={p[1]} />
            <PostJot key={p[2].id} post={p[2]} />
            <PostJot key={p[3].id} post={p[3]} />
            {
              p.length === 8 && (
                <>
                  <PostStoryPanel posts={p.slice(4, 8)} panelLabel={panelLabel} panelLabelLink={panelLabelLink} />
                </>
              )
            }
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xInvertedHero1xStoryPanel3xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  panelLabel: PropTypes.string,
  panelLabelLink: PropTypes.string,
};

PostSection1xInvertedHero1xStoryPanel3xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
  panelLabel: '',
  panelLabelLink: '',
};

export default PostSection1xInvertedHero1xStoryPanel3xJot;
