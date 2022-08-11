import React from 'react';
import PropTypes from 'prop-types';
import PostPuff from '../post-items/PostPuff';
import Mpu from '../ads/Mpu';
import PostSectionTitle from './PostSectionTitle';
import PostSectionWrapper from './PostSectionWrapper';
import { dedupePostList } from '../../utils/post';

/**
 * The PostSection6xPuff component outputs 6 posts as PostPuff components and a single
 * Mpu component into the following layouts.
 *
 * Desktop (min-width: 1024px):
 * ╔══════╤══════╤═════╗
 * ║ Puff │ Puff │     ║
 * ╟──────┼──────┤     ║
 * ║ Puff │ Puff │ MPU ║
 * ╟──────┼──────┤     ║
 * ║ Puff │ Puff │     ║
 * ╚══════╧══════╧═════╝
 *
 * Tablet (min-width: 768px):
 * ╔══════╤══════╗
 * ║ Puff │ MPU  ║
 * ╟──────┤      ║
 * ║ Puff │      ║
 * ╟──────┤      ║
 * ║ Puff │      ║
 * ╟──────┤      ║
 * ║ Puff │      ║
 * ╟──────┼──────╢
 * ║ Puff │ Puff ║
 * ╚══════╧══════╝
 *
 * Mobile:
 * ╔══════╗
 * ║ Puff ║
 * ╟──────╢
 * ║ Puff ║
 * ╟──────╢
 * ║ Puff ║
 * ╟──────╢
 * ║ Puff ║
 * ╟──────╢
 * ║ Puff ║
 * ╟──────╢
 * ║ Puff ║
 * ╟──────╢
 * ║ MPU  ║
 * ╚══════╝
 *
 *
 * @param {items: [...posts]} props
 * @see '../post-items/PostPuff'
 * @see '../ads/Mpu'
 */

const PostSection6xPuff1xMpu = (props) => {
  const {
    items, title, link, pos, showAuthor, showPubDate, className,
  } = props;
  const p = dedupePostList(items, 6);

  return (
    p.length > 0
      ? (
        <PostSectionWrapper type="PostSection6xPuff1xMpu" className={className}>
          <PostSectionTitle title={title} link={link} />
          <div className="inews__post-section__body">
            {p.map((post) => <PostPuff key={post.id} post={post} showAuthor={showAuthor} showPubDate={showPubDate} />)}
            <div className="inews__post inews__post__mpu">
              <Mpu pos={pos} />
            </div>
          </div>
        </PostSectionWrapper>
      )
      : null
  );
};

PostSection6xPuff1xMpu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  pos: PropTypes.string,
  className: PropTypes.string,
  showAuthor: PropTypes.bool,
  showPubDate: PropTypes.bool,
};

PostSection6xPuff1xMpu.defaultProps = {
  title: '',
  link: '',
  pos: '',
  className: '',
  showAuthor: false,
  showPubDate: false,
};

export default PostSection6xPuff1xMpu;
