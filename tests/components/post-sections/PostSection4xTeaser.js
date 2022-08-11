import React from 'react';
import PostSection4xTeaser from '../../../components/post-sections/PostSection4xTeaser';

const items = [
  {
    id: 1,
    title: {
      rendered: 'title 1',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article-1',
  },
  {
    id: 2,
    title: {
      rendered: 'title 2',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article-2',
  },
  {
    id: 3,
    title: {
      rendered: 'title 3',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article-3',
  },
  {
    id: 4,
    title: {
      rendered: 'title 4',
    },
    breadcrumbs: [
      { name: 'News' },
    ],
    link: 'https://inews-article.com/test-article-4',
  },
];

jest.mock('../../../utils/post', () => ({
  __esModule: true,
  dedupePostList: jest.fn((dedupeItems, count = 10) => dedupeItems.slice(0, count)),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders the snapshot', () => {
  const postSection4xTeaser = shallow(<PostSection4xTeaser items={items} title="PostSection title" link="https://inews.test/news" />);
  expect(postSection4xTeaser).toMatchSnapshot();
});

it('should output with the correct class and data-type on the root element', () => {
  const postSection4xTeaser = shallow(<PostSection4xTeaser items={items} />);
  const postSectionWrapper = postSection4xTeaser.find('PostSectionWrapper');
  expect(postSectionWrapper.length).toBe(1);
  expect(postSectionWrapper.prop('type')).toBe('PostSection4xTeaser');
});

it('should call the <PostSectionTitle /> component with the correct props', () => {
  const allProps = shallow(<PostSection4xTeaser items={items} title="PostSection title" link="https://inews.test/news" />);
  const justTitle = shallow(<PostSection4xTeaser items={items} title="PostSection title" />);
  const noProps = shallow(<PostSection4xTeaser items={items} />);

  const allPropsTitle = allProps.find('PostSectionTitle');
  expect(allPropsTitle.length).toBe(1);
  expect(allPropsTitle.prop('title')).toBe('PostSection title');
  expect(allPropsTitle.prop('link')).toBe('https://inews.test/news');

  const justTitleTitle = justTitle.find('PostSectionTitle');
  expect(justTitleTitle.length).toBe(1);
  expect(justTitleTitle.prop('title')).toBe('PostSection title');
  expect(justTitleTitle.prop('link')).toBe('');

  const noPropsTitle = noProps.find('PostSectionTitle');
  expect(noPropsTitle.length).toBe(1);
  expect(noPropsTitle.prop('title')).toBe('');
  expect(noPropsTitle.prop('link')).toBe('');
});

it('should call the <PostTeaser /> component four times with the correct props', () => {
  const postSection4xTeaser = shallow(<PostSection4xTeaser items={items} />);
  const PostTeasers = postSection4xTeaser.find('PostTeaser');
  expect(PostTeasers.length).toBe(4);

  expect(PostTeasers.at(0).prop('post')).toMatchObject(items[0]);
  expect(PostTeasers.at(1).prop('post')).toMatchObject(items[1]);
  expect(PostTeasers.at(2).prop('post')).toMatchObject(items[2]);
  expect(PostTeasers.at(3).prop('post')).toMatchObject(items[3]);

});

it('should call the <PostTeaser /> a upto four times if less than 4 items are passed to it', () => {
  const lessItems = [{ id: 1 }, { id: 2 }];
  const postSection4xTeaser = shallow(<PostSection4xTeaser items={lessItems} />);
  const PostTeasers = postSection4xTeaser.find('PostTeaser');
  expect(PostTeasers.length).toBe(2);
});

it('should call the <PostTeaser /> a maximum of four times regardless of how many items are passed to it', () => {
  const moreItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const postSection4xTeaser = shallow(<PostSection4xTeaser items={moreItems} />);
  const PostTeasers = postSection4xTeaser.find('PostTeaser');
  expect(PostTeasers.length).toBe(4);
});

it('output null if items is an empty array', () => {
  const postSection4xTeaser = shallow(<PostSection4xTeaser items={[]} />);
  expect(postSection4xTeaser.getElement()).toBe(null);
});
