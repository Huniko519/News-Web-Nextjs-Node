import React from 'react';
import PostItemMedia from '../../../components/post-items/PostItemMedia';
import * as mockUtilImage from '../../../utils/image';
import * as mockUtilPost from '../../../utils/post';

jest.mock('../../../utils/image', () => ({
  __esModule: true,
  getFeaturedImage: jest.fn(() => ({
    src: 'featured-image.jpg',
    height: 100,
    width: 100,
    caption: '',
    alt: '',
  })),
  getCoAuthorImage: jest.fn(() => ({
    src: 'coauthor-image.jpg',
    height: 100,
    width: 100,
    caption: '',
    alt: '',
  })),
}));

jest.mock('../../../utils/post', () => ({
  __esModule: true,
  getVideoIcon: jest.fn((post) => (post.featured_video ? <svg /> : null)),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders the snapshot', () => {
  const post = {
    id: 1,
    title: {
      rendered: 'title',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
  };
  const postItemMedia = shallow(<PostItemMedia post={post} />);
  expect(postItemMedia).toMatchSnapshot();
});

it('should output a linked image with the data from getFeaturedImage', () => {
  const post = {
    id: 1,
    title: {
      rendered: 'title',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
  };

  const postItemMedia = shallow(
    <PostItemMedia
      post={post}
      className="class-name"
      imageSize="small-1:1"
    />,
  );

  expect(mockUtilImage.getFeaturedImage).toHaveBeenCalled();
  expect(mockUtilImage.getFeaturedImage).toHaveBeenCalledWith(post, 'small-1:1', '/static/images/placeholder/placeholder-84x84.png');
  expect(mockUtilImage.getCoAuthorImage).not.toHaveBeenCalled();

  expect(postItemMedia.hasClass('class-name')).toBe(true);
  const anchor = postItemMedia.find('a');
  expect(anchor.length).toBe(1);
  expect(anchor.prop('href')).toBe(post.link);
  expect(anchor.prop('title')).toBe(post.title.raw);
  const ampImg = anchor.find('amp-img');
  expect(ampImg.length).toBe(1);
  expect(ampImg.prop('src')).toBe('featured-image.jpg');
  expect(ampImg.prop('layout')).toBe('fixed');
  expect(ampImg.prop('height')).toBe(84);
  expect(ampImg.prop('width')).toBe(84);
});

it('should output the linked image with data from getCoAuthorImage instead of getFeaturedImage when showAuthor = true && coAuthor exists', () => {
  const post = {
    'id': 1,
    'title': {
      rendered: 'title',
    },
    'breadcrumbs': [
      { name: 'News' },
    ],
    'link': 'https://inews-article.com/test-article',
    'co-authors': [
      {
        display_name: 'name',
      },
    ],
  };

  const postItemMedia = shallow(<PostItemMedia post={post} showAuthor />);

  expect(mockUtilImage.getCoAuthorImage).toHaveBeenCalled();
  expect(mockUtilImage.getCoAuthorImage).toHaveBeenCalledWith(post['co-authors'][0], 'medium-1:1', '/static/images/placeholder/placeholder-84x84.png', false);

  const ampImg = postItemMedia.find('amp-img');
  expect(ampImg.length).toBe(1);
  expect(ampImg.prop('src')).toBe('coauthor-image.jpg');
});

it('should output the featured image when showAuthor = true but coAuthor doesn\'t exist', () => {
  const post = {
    'id': 1,
    'title': {
      rendered: 'title',
    },
    'breadcrumbs': [
      { name: 'News' },
    ],
    'link': 'https://inews-article.com/test-article',
    'co-authors': [],
  };

  const postItemMedia = shallow(<PostItemMedia post={post} showAuthor />);
  expect(mockUtilImage.getCoAuthorImage).not.toHaveBeenCalled();

  const ampImg = postItemMedia.find('amp-img');
  expect(ampImg.length).toBe(1);
  expect(ampImg.prop('src')).toBe('featured-image.jpg');
});

it('should output the video icon if returned from getVideoIcon', () => {
  const post = {
    id: 1,
    title: {
      rendered: 'title',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
    featured_video: true,
  };

  // There is a featured_video and thus should display videoIcon svg
  const postItemMedia1 = shallow(<PostItemMedia post={post} />);
  expect(mockUtilPost.getVideoIcon).toHaveBeenCalled();
  const videoIcon1 = postItemMedia1.find('svg');
  expect(videoIcon1.length).toBe(1);

  jest.clearAllMocks();

  post.featured_video = false;
  // There isn't a featured_video and thus shouldn't a display videoIcon svg
  const postItemMedia2 = shallow(<PostItemMedia post={post} />);
  expect(mockUtilPost.getVideoIcon).toHaveBeenCalled();
  const videoIcon2 = postItemMedia2.find('svg');
  expect(videoIcon2.length).toBe(0);
});

it('should set the width, height and layout on amp-img from prop values when set', () => {
  const post = {
    id: 1,
    title: {
      rendered: 'title',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
  };
  const postItemMedia = shallow(
    <PostItemMedia
      post={post}
      width={1000}
      height={500}
      layout="responsive"
    />,
  );

  const ampImg = postItemMedia.find('amp-img');
  expect(ampImg.prop('width')).toBe(1000);
  expect(ampImg.prop('height')).toBe(500);
  expect(ampImg.prop('layout')).toBe('responsive');
});
