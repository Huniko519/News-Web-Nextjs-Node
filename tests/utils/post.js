import {
  isValidPostUrl,
  getSocialTitle,
  postItemWPAPIFields,
  getVideoIcon,
  getReviewRatingClassName,
} from '../../utils/post';

jest.mock('../../config', () => ({
  feDomain: 'https://inewstest.co.uk',
  publicApiUrl: 'https://api.public.inewstest.co.uk',
  privateApiUrl: 'https://api.private.inewstest.co.uk',
}));

describe('getVideoIcon', () => {
  test('it returns the expected Video icon if post.featured_video is truthy', () => {
    const videoIcon = shallow(getVideoIcon({ featured_video: 'true' }));
    expect(videoIcon).toMatchSnapshot();
  });

  test('it returns an empty string if post.featured_video does not exist', () => {
    const videoIcon = getVideoIcon({});
    expect(videoIcon).toBe(null);
  });

  test('it returns an empty string if post.featured_video is empty', () => {
    const rendered = getVideoIcon({ featured_video: '' });
    expect(rendered).toBe(null);
  });
});

describe('isValidPostUrl', () => {
  test('to return false if the accessed url doesn\'t match post.link', () => {
    const context = {
      asPath: '/news/lifestyle/incorrect-article-12345',
    };

    const post = {
      link: 'https://inews.co.uk/news/lifestyle/correct-article-12345',
    };

    expect(isValidPostUrl(context, post)).toBe(false);
  });

  test('to return false if the context.asPath doesn\'t match post.link', () => {
    const context = {
      asPath: '/news/lifestyle/incorrect-article-12345',
    };

    const post = {
      link: 'https://inewstest.co.uk/news/lifestyle/correct-article-12345',
    };

    expect(isValidPostUrl(context, post)).toBe(false);
  });

  test('to return false if the config.feDomain doesn\'t match post.link host', () => {
    const context = {
      asPath: '/news/lifestyle/correct-article-12345',
    };

    const post = {
      link: 'https://inews.co.uk/news/lifestyle/correct-article-12345',
    };

    expect(isValidPostUrl(context, post)).toBe(false);
  });

  test('to return true if accessed url matches post.link', () => {
    const context = {
      asPath: '/news/lifestyle/correct-article-12345',
    };

    const post = {
      link: 'https://inewstest.co.uk/news/lifestyle/correct-article-12345',
    };

    expect(isValidPostUrl(context, post)).toBe(true);
  });

  test('to return true if accessed url matches post.link regardless of query string', () => {
    const context = {
      asPath: '/news/lifestyle/correct-article-12345?a=1,b=2,c-3',
    };

    const post = {
      link: 'https://inewstest.co.uk/news/lifestyle/correct-article-12345',
    };

    expect(isValidPostUrl(context, post)).toBe(true);
  });
});

describe('getSocialIcon', () => {
  test('to return the social title if set', () => {
    const post = {
      title: {
        rendered: 'Post Title',
      },
      social_title: {
        rendered: 'Social Title',
      },
    };
    expect(getSocialTitle(post)).toBe('Social Title');
  });

  test('to return the post title if no social title', () => {
    const post = {
      title: {
        rendered: 'Post Title',
      },
    };
    expect(getSocialTitle(post)).toBe('Post Title');
  });

  test('to return the post title if an empty social title', () => {
    const post = {
      title: {
        rendered: 'Post Title',
      },
      social_title: {
        rendered: '',
      },
    };
    expect(getSocialTitle(post)).toBe('Post Title');
  });
});

describe('postItemWPAPIFields', () => {
  test('to be an array of strings', () => {
    let pass = false;

    if (Array.isArray(postItemWPAPIFields)) {
      let allStrings = true;
      /* eslint-disable array-callback-return */
      postItemWPAPIFields.map(
        (value) => {
          if (typeof (value) !== 'string') {
            allStrings = false;
          }
        },
      );
      /* eslint-enable array-callback-return */
      pass = allStrings;
    }

    expect(pass).toBe(true);
  });

  test('to contain at least the minumum amount of expected fields', () => {
    const expected = [
      'id',
      'type',
      'link',
      'title',
      'breadcrumbs',
      'featured_video',
      'mdt_review',
      'co-authors',
      'social_title',
      '_links.wp:featuredmedia',
    ];

    expect(postItemWPAPIFields).toEqual(expect.arrayContaining(expected));
  });
});

describe('getReviewRatingClassName', () => {
  it('returns an empty string is post.mdt_review.rating doesn\'t exist', () => {
    const className = getReviewRatingClassName({});
    expect(className).toBe('');
  });

  it('returns the correct className with the value of rating appended to it', () => {
    const className = getReviewRatingClassName({ mdt_review: { rating: 5 } });
    expect(className).toBe('inews__post__review-stars__5');
  });
});
