import React from 'react';
import PostItemBadge from '../../../components/post-items/PostItemBadge';

test('Should output a category badge with the correct link for a post with breadcrumbs', () => {
  const post = {
    type: 'post',
    breadcrumbs: [
      {
        name: 'News',
        link: 'https://inews.test/news',
      },
    ],
  };
  const badge = shallow(<PostItemBadge post={post} />);

  expect(badge.type()).toBe('span');
  expect(badge.hasClass('inews__post__category')).toBe(true);
  expect(badge.childAt(0).type()).toBe('a');
  expect(badge.find('a').prop('dangerouslySetInnerHTML')).toMatchObject({
    __html: post.breadcrumbs[0].name,
  });
  expect(badge.find('a').prop('href')).toBe(post.breadcrumbs[0].link);
  expect(badge.find('a').prop('title')).toBe(post.breadcrumbs[0].name);
});

test('Should display the name and link from the second item of the breadcrumbs array if present', () => {
  const post = {
    type: 'post',
    breadcrumbs: [
      {
        name: 'News',
        link: 'https://inews.test/news',
      },
      {
        name: 'World',
        link: 'https://inews.test/news/world',
      },
    ],
  };
  const badge = shallow(<PostItemBadge post={post} />);

  expect(badge.find('a').prop('dangerouslySetInnerHTML')).toMatchObject({
    __html: post.breadcrumbs[1].name,
  });
  expect(badge.find('a').prop('href')).toBe(post.breadcrumbs[1].link);
  expect(badge.find('a').prop('title')).toBe(post.breadcrumbs[1].name);
});

test('Should output null if post.breadcrumbs isn\'t set', () => {
  const post = {
    type: 'post',
    breadcrumbs: [],
  };
  const badge = shallow(<PostItemBadge post={post} />);

  expect(badge.getElement()).toBe(null);
});

test('Should output a sponsored label if post.type === post_sponsored', () => {
  const post = {
    type: 'post_sponsored',
    breadcrumbs: [
      {
        name: 'News',
        link: 'https://inews.test/news',
      },
    ],
  };
  const badge = shallow(<PostItemBadge post={post} />);

  expect(badge.type()).toBe('span');
  expect(badge.hasClass('inews__post__sponsored-label')).toBe(true);
  expect(badge.text()).toBe('Promoted Content');
});

test('Should output a sponsored label even if post.breadcrumbs isn\'t set', () => {
  const post = {
    type: 'post_sponsored',
    breadcrumbs: [],
  };
  const badge = shallow(<PostItemBadge post={post} />);

  expect(badge.type()).toBe('span');
  expect(badge.hasClass('inews__post__sponsored-label')).toBe(true);
  expect(badge.text()).toBe('Promoted Content');
});
