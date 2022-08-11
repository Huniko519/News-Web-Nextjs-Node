import React from 'react';
import PostPuff from '../../../components/post-items/PostPuff';

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
  const postPuff = shallow(<PostPuff post={post} />);
  expect(postPuff).toMatchSnapshot();
});

it('should output with the correct class on the root element', () => {
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
  const postPuff = shallow(<PostPuff post={post} />);
  expect(postPuff.hasClass('inews__post')).toBe(true);
  expect(postPuff.hasClass('inews__post-puff')).toBe(true);
});

it('should call the <PostItemMedia /> component with the correct props', () => {
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

  const postPuff = shallow(<PostPuff post={post} />);
  const postItemMedia = postPuff.find('PostItemMedia');
  expect(postItemMedia.length).toBe(1);
  expect(postItemMedia.prop('className')).toBe('inews__post-puff__media');
  expect(postItemMedia.prop('imageSize')).toBe('small-1:1');
  expect(postItemMedia.prop('showAuthor')).toBe(false);
  expect(postItemMedia.prop('post')).toMatchObject(post);
});

it('should call the <PostItemTitle /> component with the correct props', () => {
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

  const postPuff = shallow(<PostPuff post={post} />);
  const postItemMedia = postPuff.find('PostItemTitle');
  expect(postItemMedia.length).toBe(1);
  expect(postItemMedia.prop('post')).toMatchObject(post);
});

it('should output a <PostItemBadge /> component', () => {
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
  const postPuff = shallow(<PostPuff post={post} />);
  expect(postPuff.find('PostItemBadge').length).toBe(1);
  expect(postPuff.find('PostItemBadge').prop('post')).toMatchObject(post);
});
