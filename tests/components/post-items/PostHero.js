import React from 'react';
import PostHero from '../../../components/post-items/PostHero';

test('renders the snapshot', () => {
  const post = {
    id: 1,
    title: {
      rendered: 'title',
    },
    excerpt: {
      rendered: 'excerpt',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
  };
  const postHero = shallow(<PostHero post={post} />);
  expect(postHero).toMatchSnapshot();
});

it('should output with the correct class on the root element', () => {
  const post = {
    id: 1,
    title: {
      rendered: 'title',
    },
    excerpt: {
      rendered: 'excerpt',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
  };
  const postHero = shallow(<PostHero post={post} />);
  expect(postHero.hasClass('inews__post')).toBe(true);
  expect(postHero.hasClass('inews__post-hero')).toBe(true);
});

it('should call the <PostItemMedia /> component with the correct props', () => {
  const post = {
    id: 1,
    title: {
      rendered: 'title',
    },
    excerpt: {
      rendered: 'excerpt',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
  };

  const postHero = shallow(<PostHero post={post} />);
  const postItemMedia = postHero.find('PostItemMedia');
  expect(postItemMedia.length).toBe(1);
  expect(postItemMedia.prop('className')).toBe('inews__post-hero__media');
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
    excerpt: {
      rendered: 'excerpt',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
  };

  const postHero = shallow(<PostHero post={post} />);
  const postItemTitle = postHero.find('PostItemTitle');
  expect(postItemTitle.length).toBe(1);
  expect(postItemTitle.prop('post')).toMatchObject(post);
});

it('should output a Sponsored label if post.type === post_sponsored', () => {
  const post = {
    id: 1,
    type: 'post_sponsored',
    title: {
      rendered: 'title',
    },
    excerpt: {
      rendered: 'excerpt',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article',
  };
  const postHero = shallow(<PostHero post={post} />);
  const label = postHero.find('span.inews__post__sponsored-label');
  expect(label.length).toBe(1);
  expect(label.text()).toBe('Promoted Content');
});
