import React from 'react';
import PostTeaser from '../../../components/post-items/PostTeaser';

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
  const postTeaser = shallow(<PostTeaser post={post} />);
  expect(postTeaser).toMatchSnapshot();
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
  const postTeaser = shallow(<PostTeaser post={post} />);
  expect(postTeaser.hasClass('inews__post')).toBe(true);
  expect(postTeaser.hasClass('inews__post-teaser')).toBe(true);
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

  const postTeaser = shallow(<PostTeaser post={post} />);
  const postItemMedia = postTeaser.find('PostItemMedia');
  expect(postItemMedia.length).toBe(1);
  expect(postItemMedia.prop('className')).toBe('inews__post-teaser__media');
  expect(postItemMedia.prop('imageSize')).toBe('medium-16:9');
  expect(postItemMedia.prop('width')).toBe(16);
  expect(postItemMedia.prop('height')).toBe(9);
  expect(postItemMedia.prop('layout')).toBe('responsive');
  expect(postItemMedia.prop('placeholder')).toBe('/static/images/placeholder/placeholder-640x360.png');
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

  const postTeaser = shallow(<PostTeaser post={post} />);
  const postItemMedia = postTeaser.find('PostItemTitle');
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
  const postTeaser = shallow(<PostTeaser post={post} />);
  expect(postTeaser.find('PostItemBadge').length).toBe(1);
  expect(postTeaser.find('PostItemBadge').prop('post')).toMatchObject(post);
});
