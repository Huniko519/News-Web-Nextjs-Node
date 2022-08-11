import React from 'react';
import PostPodium from '../../../components/post-items/PostPodium';

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
  const postPodium = shallow(<PostPodium post={post} />);
  expect(postPodium).toMatchSnapshot();
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
  const postPodium = shallow(<PostPodium post={post} />);
  expect(postPodium.hasClass('inews__post')).toBe(true);
  expect(postPodium.hasClass('inews__post-podium')).toBe(true);
  expect(postPodium.hasClass('show-author')).toBe(true);
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

  const postPodium = shallow(<PostPodium post={post} />);
  const postItemMedia = postPodium.find('PostItemMedia');
  expect(postItemMedia.length).toBe(1);
  expect(postItemMedia.prop('className')).toBe('inews__post-podium__media');
  expect(postItemMedia.prop('imageSize')).toBe('small-1:1');
  expect(postItemMedia.prop('width')).toBe(155);
  expect(postItemMedia.prop('height')).toBe(155);
  expect(postItemMedia.prop('layout')).toBe('fixed');
  expect(postItemMedia.prop('placeholder')).toBe('/static/images/placeholder/placeholder-84x84.png');
  expect(postItemMedia.prop('showAuthor')).toBe(true);
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

  const postPodium = shallow(<PostPodium post={post} />);
  const postItemMedia = postPodium.find('PostItemTitle');
  expect(postItemMedia.length).toBe(1);
  expect(postItemMedia.prop('post')).toMatchObject(post);
});

it('should output a <PostItemBadge /> component', () => {
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
  const postPodium = shallow(<PostPodium post={post} />);
  expect(postPodium.find('PostItemBadge').length).toBe(1);
  expect(postPodium.find('PostItemBadge').prop('post')).toMatchObject(post);
  expect(postPodium.find('PostItemBadge').prop('showAuthor')).toBe(true);
});

it('should output the post excerpt', () => {
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
  const postPodium = shallow(<PostPodium post={post} />);
  const excerptP = postPodium.find('p');
  expect(excerptP.length).toBe(1);
  expect(excerptP.hasClass('inews__post-podium__excerpt')).toBe(true);
  expect(excerptP.prop('dangerouslySetInnerHTML')).toMatchObject({
    __html: post.excerpt.rendered,
  });
});
