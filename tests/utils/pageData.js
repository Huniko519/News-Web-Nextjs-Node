import { getPageDataFromProps } from '../../utils/pageData';

describe('Home/Tag/Author/Page pageData', () => {
  const expected = {
    topCategory: 'home',
    subCategory: 'home',
    type: 'home',
  };

  test('Home pageProps should return default pageData', () => {
    const props = {
      router: {},
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });

  test('Tag pageProps should return default pageData', () => {
    const props = {
      tags: [{}],
      router: {},
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });

  test('Author pageProps should return default pageData', () => {
    const props = {
      authors: [{}],
      router: {},
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });

  test('Page pageProps should return default pageData', () => {
    const props = {
      post: { type: 'page' },
      router: {},
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });
});

describe('Post pageData', () => {
  test('Post pageProps should return article pageData', () => {
    const props = {
      post: {
        type: 'post',
        breadcrumbs: [],
      },
      router: {},
    };
    const expected = {
      topCategory: '',
      subCategory: '',
      type: 'article',
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });

  test('Sponsored Post pageProps should return article pageData', () => {
    const props = {
      post: {
        type: 'post_sponsored',
        breadcrumbs: [],
      },
      router: {},
    };
    const expected = {
      topCategory: '',
      subCategory: '',
      type: 'article',
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });

  test('topCategory should be set if post.breadcrumbs has one item', () => {
    const props = {
      post: {
        type: 'post',
        breadcrumbs: [
          { slug: 'news' },
        ],
      },
      router: {},
    };
    const expected = {
      topCategory: 'news',
      subCategory: '',
      type: 'article',
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });

  test('subCategory should be set if post.breadcrumbs has two items', () => {
    const props = {
      post: {
        type: 'post',
        breadcrumbs: [
          { slug: 'news' },
          { slug: 'world' },
        ],
      },
      router: {},
    };
    const expected = {
      topCategory: 'news',
      subCategory: 'world',
      type: 'article',
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });
});

describe('Category pageData', () => {
  test('category pageProps should return category pageData', () => {
    const props = {
      categories: [
        {
          slug: 'news',
        },
      ],
      router: {},
    };
    const expected = {
      topCategory: 'news',
      subCategory: 'news',
      type: 'home',
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });

  test('it should set category slug as topCategory and subCategory if no parent category', () => {
    const props = {
      categories: [
        {
          slug: 'news',
          parent: 0,
        },
      ],
      router: {},
    };
    const expected = {
      topCategory: 'news',
      subCategory: 'news',
      type: 'home',
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });

  test('it should set category slug as subCategory and parent category slug as topCategory', () => {
    const props = {
      categories: [
        {
          slug: 'world',
          parent: 5,
          _embedded: {
            up: [
              {
                slug: 'news',
              },
            ],
          },
        },
      ],
      router: {},
    };
    const expected = {
      topCategory: 'news',
      subCategory: 'world',
      type: 'home',
    };
    const pageData = getPageDataFromProps(props);
    expect(pageData).toMatchObject(expected);
  });
});
