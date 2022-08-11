import React from 'react';
import PropTypes from 'prop-types';
import PostTeaser from '../post-items/PostTeaser';
import PostJot from '../post-items/PostJot';
import Mpu from '../ads/Mpu';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';


/**
 * The PostSection1xTeaser3xJot1xMpu component outputs 4 posts as 1 PostTeaser component and
 * 3 PostJot components alongside an Mpu into the following layouts.
 *
 * Desktop (min-width: 1024px):
 * ╔════════╤══════╤═════╗
 * ║ Teaser │ Jot  │ MPU ║
 * ║        ╞══════╡     ║
 * ║        │ Jot  │     ║
 * ║        ├──────┤     ║
 * ║        │ Jot  │     ║
 * ╚════════╧══════╧═════╝
 *
 * Tablet (min-width: 768px):
 * ╔══════╤═════╗
 * ║ Puff │ MPU ║
 * ╠══════╡     ║
 * ║ Puff │     ║
 * ╟──────┤     ║
 * ║ Puff │     ║
 * ╟──────┤     ║
 * ║ Puff │     ║
 * ╚══════╧═════╝
 *
 * Mobile:
 * ╔══════╗
 * ║ Puff ║
 * ╠══════╣
 * ║ Puff ║
 * ╟──────╢
 * ║ Puff ║
 * ╟──────╢
 * ║ Puff ║
 * ╟──────╢
 * ║ MPU  ║
 * ╚══════╝
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostJot'
 * @see '../post-items/PostTeaser'
 * @see '../ads/Mpu'
 */
const PostSection1xTeaser3xJot1xMpu = (props) => {
  const {
    items, title, link, pos, className,
  } = props;
  const p = dedupePostList(items, 4);

  return (
    p.length > 0
      ? (
        <PostSectionWrapper type="PostSection1xTeaser3xJot1xMpu" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            <PostTeaser key={p[0].id} post={p[0]} />
            {p.slice(1, 4).map(
              (post) => <PostJot key={post.id} post={post} />,
            )}
            <div className="inews__post inews__post__mpu">
              <Mpu pos={pos} />
            </div>
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection1xTeaser3xJot1xMpu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  pos: PropTypes.string,
  className: PropTypes.string,
};

PostSection1xTeaser3xJot1xMpu.defaultProps = {
  title: '',
  link: '',
  pos: '',
  className: '',
};


export default PostSection1xTeaser3xJot1xMpu;
