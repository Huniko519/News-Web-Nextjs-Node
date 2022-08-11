import React from 'react';
import PostItemTitle from '../../../components/post-items/PostItemTitle';
import * as mockUtilPost from '../../../utils/post';

jest.mock('../../../utils/post', () => ({
  __esModule: true,
  getSocialTitle: jest.fn(() => 'Social Title'),
  getReviewRatingClassName: jest.fn(() => 'rating-class-name'),
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
  const postItemTitle = shallow(<PostItemTitle post={post} />);
  expect(postItemTitle).toMatchSnapshot();
});

it('should output a linked headline using the title returned from getSocialTitle', () => {
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
  const postItemTitle = shallow(<PostItemTitle post={post} />);
  expect(mockUtilPost.getSocialTitle).toHaveBeenCalled();
  expect(mockUtilPost.getReviewRatingClassName).toHaveBeenCalled();

  const header = postItemTitle.find('h2');
  expect(header.length).toBe(1);
  const anchor = header.find('a');
  expect(anchor.length).toBe(1);
  expect(anchor.prop('href')).toBe(post.link);
  expect(anchor.prop('title')).toBe(post.title.raw);
  expect(anchor.prop('className')).toBe('rating-class-name');
  expect(anchor.prop('dangerouslySetInnerHTML')).toMatchObject({
    __html: 'Social Title',
  });
});
