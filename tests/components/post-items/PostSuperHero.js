import React from 'react';
import PostSuperHero from '../../../components/post-items/PostSuperHero';

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
  const postSuperHero = shallow(<PostSuperHero post={post} />);
  expect(postSuperHero).toMatchSnapshot();
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
  const postSuperHero = shallow(<PostSuperHero post={post} />);
  expect(postSuperHero.hasClass('inews__post')).toBe(true);
  expect(postSuperHero.hasClass('inews__post-superhero')).toBe(true);
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

  const postSuperHero = shallow(<PostSuperHero post={post} />);
  const postItemMedia = postSuperHero.find('PostItemMedia');
  expect(postItemMedia.length).toBe(2);
  expect(postItemMedia.at(0).prop('className')).toBe('inews__post-superhero__media inews__post-superhero__media--1-1');
  expect(postItemMedia.at(0).prop('imageSize')).toBe('medium-1:1');
  expect(postItemMedia.at(0).prop('width')).toBe(1);
  expect(postItemMedia.at(0).prop('height')).toBe(1);
  expect(postItemMedia.at(0).prop('layout')).toBe('responsive');
  expect(postItemMedia.at(0).prop('post')).toMatchObject(post);

  expect(postItemMedia.at(1).prop('className')).toBe('inews__post-superhero__media inews__post-superhero__media--16-9');
  expect(postItemMedia.at(1).prop('imageSize')).toBe('medium-16:9');
  expect(postItemMedia.at(1).prop('width')).toBe(16);
  expect(postItemMedia.at(1).prop('height')).toBe(9);
  expect(postItemMedia.at(1).prop('layout')).toBe('responsive');
  expect(postItemMedia.at(1).prop('post')).toMatchObject(post);
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

  const postSuperHero = shallow(<PostSuperHero post={post} />);
  const postItemTitle = postSuperHero.find('PostItemTitle');
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
  const postSuperHero = shallow(<PostSuperHero post={post} />);
  const label = postSuperHero.find('span.inews__post__sponsored-label');
  expect(label.length).toBe(1);
  expect(label.text()).toBe('Promoted Content');
});
