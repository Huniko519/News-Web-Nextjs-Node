import React from 'react';
import PropTypes from 'prop-types';
import PostJot from '../post-items/PostJot';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSectionEmbedded component outputs 3 posts and embedded area
 *
 * Desktop (min-width: 1024px):
 * ╔══════════╤═══════╗
 * ║          │  Jot  ║
 * ║          ├───────╢
 * ║ Embedded │  Jot  ║
 * ║          ├───────╢
 * ║          │  Jot  ║
 * ╚══════════╧═══════╝
 *
 * Tablet (min-width: 768px):
 * ╔══════════╤═══════╗
 * ║          │  Jot  ║
 * ║          ├───────╢
 * ║ Embedded │  Jot  ║
 * ║          ├───────╢
 * ║          │  Jot  ║
 * ╚══════════╧═══════╝
 *
 * Mobile:
 * ╔══════════╗
 * ║          ║
 * ║ Embedded ║
 * ║          ║
 * ╟──────────╢
 * ║   Jot    ║
 * ╟──────────╢
 * ║   Jot    ║
 * ╟──────────╢
 * ║   Jot    ║
 * ╚══════════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostJot'
 */
const PostSectionEmbedded = (props) => {
  const {
    items, title, type, iframe_source, image_destination, image_src, className,
  } = props;
  const p = dedupePostList(items, 3);

  return (
    p.length === 3
      ? (
        <PostSectionWrapper type="PostSectionLayout" className={`${className} embedded`}>
          <PostSectionTitle title={title} />
          <div className="inews__post-section__body">
            {type === 'image' ? (
              <div className="embedded__image">
                <a href={image_destination} title={title}>
                  <amp-img alt="Article thumbnail" src={image_src} width={16} height={9} layout="responsive" />
                </a>
              </div>
            ) : (
              <div className="embedded__wrapper">
                <iframe
                  className="embedded__iframe"
                  title={title}
                  width="100%"
                  height="100%"
                  src={iframe_source}
                  frameBorder="0"
                />
              </div>
            )}
            {p.map(
              (post) => <PostJot key={post.id} post={post} />,
            )}
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSectionEmbedded.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  iframe_source: PropTypes.string,
  image_destination: PropTypes.string,
  image_src: PropTypes.string,
  className: PropTypes.string,
};

PostSectionEmbedded.defaultProps = {
  title: '',
  type: 'image',
  iframe_source: '',
  image_destination: '',
  image_src: '',
  className: '',
};

export default PostSectionEmbedded;
