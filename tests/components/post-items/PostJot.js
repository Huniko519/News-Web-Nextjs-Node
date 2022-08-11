import React from 'react';
import PostJot from '../../../components/post-items/PostJot';

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
  const postJot = shallow(<PostJot post={post} />);
  expect(postJot).toMatchSnapshot();
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
  const postJot = shallow(<PostJot post={post} />);
  expect(postJot.hasClass('inews__post')).toBe(true);
  expect(postJot.hasClass('inews__post-jot')).toBe(true);
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

  const postJot = shallow(<PostJot post={post} />);
  const postItemMedia = postJot.find('PostItemTitle');
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
  const postJot = shallow(<PostJot post={post} />);
  expect(postJot.find('PostItemBadge').length).toBe(1);
  expect(postJot.find('PostItemBadge').prop('showAuthor')).toBe(false)
  expect(postJot.find('PostItemBadge').prop('post')).toMatchObject(post);
});

it('should not output the <PostItemMedia />', () => {
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

  const postJot = shallow(<PostJot post={post} />);
  const postItemMedia = postJot.find('PostItemMedia');
  expect(postItemMedia.length).toBe(0);
});
