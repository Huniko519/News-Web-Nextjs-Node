import React from 'react';
import PostHeroBox from '../../../components/post-items/PostHeroBox';

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
  const postHeroBox = shallow(<PostHeroBox post={post} />);
  expect(postHeroBox).toMatchSnapshot();
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
  const postHero = shallow(<PostHeroBox post={post} />);
  expect(postHero.hasClass('inews__post')).toBe(true);
  expect(postHero.hasClass('inews__post-herobox')).toBe(true);
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

  const postHero = shallow(<PostHeroBox post={post} />);
  const postItemMedia = postHero.find('PostItemMedia');
  expect(postItemMedia.length).toBe(2);
  expect(postItemMedia.at(0).prop('className')).toBe('inews__post-herobox__media inews__post-herobox__media--1-1');
  expect(postItemMedia.at(0).prop('imageSize')).toBe('medium-1:1');
  expect(postItemMedia.at(0).prop('width')).toBe(1);
  expect(postItemMedia.at(0).prop('height')).toBe(1);
  expect(postItemMedia.at(0).prop('layout')).toBe('responsive');
  expect(postItemMedia.at(0).prop('post')).toMatchObject(post);

  expect(postItemMedia.at(1).prop('className')).toBe('inews__post-herobox__media inews__post-herobox__media--16-9');
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

  const postHero = shallow(<PostHeroBox post={post} />);
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
  const postHero = shallow(<PostHeroBox post={post} />);
  const label = postHero.find('span.inews__post__sponsored-label');
  expect(label.length).toBe(1);
  expect(label.text()).toBe('Promoted Content');
});

it('should output a author and author image if post.template === opinion and showAuthor prop is true', () => {
  const post = {
    'id': 1,
    'template': 'opinion',
    'co-authors': [
      {
        display_name: 'Andrew Fisher',
      },
    ],
    'title': {
      rendered: 'title',
    },
    'excerpt': {
      rendered: 'excerpt',
    },
    'breadcrumbs': [
      { name: 'News' },
    ],
    'link': 'https://inews-article.com/test-article',
  };
  const postHero = shallow(<PostHeroBox post={post} showAuthor />);
  const label = postHero.find('.inews__post-herobox_author .inews__post__badge a');
  expect(label.length).toBe(1);
  expect(label.text()).toBe('Andrew Fisher');

  const postItemMedia = postHero.find('.inews__post-herobox_author__media');
  expect(postItemMedia.length).toBe(1);
  expect(postItemMedia.prop('imageSize')).toBe('small-16:9');
  expect(postItemMedia.prop('width')).toBe(230);
  expect(postItemMedia.prop('height')).toBe(130);
  expect(postItemMedia.prop('layout')).toBe('fixed');
  expect(postItemMedia.prop('placeholder')).toBe('/static/images/placeholder/placeholder-84x84.png');
  expect(postItemMedia.prop('post')).toMatchObject(post);
  expect(postItemMedia.prop('showAuthor')).toBe(true);
});

it('should not output a author and author image if post.template !== opinion or showAuthor prop is false', () => {
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
  const postHero = shallow(<PostHeroBox post={post} />);
  const label = postHero.find('.inews__post-herobox_author .inews__post__badge a');
  expect(label.length).toBe(0);
  const postItemMedia = postHero.find('.inews__post-herobox_author__media');
  expect(postItemMedia.length).toBe(0);
});
