import { getFeaturedImage, getCoAuthorImage } from '../../utils/image';

describe('getFeaturedImage', () => {
  test('return null if no featured image found and no fallBackImage', () => {
    expect(getFeaturedImage({ code: 'rest_forbidden', data: { status: 401 } }, 'full')).toBe(null);
  });

  test('return null if no featured image ID in due to 401 in api and no fallBackImage', () => {
    expect(getFeaturedImage({}, 'full')).toBe(null);
  });

  test('return source_url value and dimensions if no size passed in', () => {
    const post = {
      _embedded: {
        'wp:featuredmedia': [
          {
            id: 12345,
            media_details: {
              width: 100,
              height: 100,
            },
            source_url: 'https://image.test.jpg',
          },
        ],
      },
    };
    const expected = {
      src: 'https://image.test.jpg',
      width: 100,
      height: 100,
      caption: '',
      alt: '',
    };
    expect(getFeaturedImage(post)).toMatchObject(expected);
  });

  test('return fallback image if no source_url', () => {
    const post = {
      _embedded: {
        'wp:featuredmedia': [
          {
            id: 12345,
            media_details: {
              width: 100,
              height: 100,
            },
          },
        ],
      },
    };
    const expected = {
      src: 'https://image.fallback.jpg',
      width: 0,
      height: 0,
      caption: '',
      alt: '',
    };
    expect(getFeaturedImage(post, 'full', 'https://image.fallback.jpg')).toMatchObject(expected);
  });

  test('set the caption and alt properties if they exist for image', () => {
    const post = {
      _embedded: {
        'wp:featuredmedia': [
          {
            id: 12345,
            media_details: {
              width: 100,
              height: 100,
            },
            source_url: 'https://image.test.jpg',
            caption: {
              rendered: 'caption',
            },
            alt_text: 'alt',
          },
        ],
      },
    };
    const expected = {
      src: 'https://image.test.jpg',
      width: 100,
      height: 100,
      caption: 'caption',
      alt: 'alt',
    };
    expect(getFeaturedImage(post)).toMatchObject(expected);
  });

  test('if custom size exists use its src, width and height values', () => {
    const post = {
      _embedded: {
        'wp:featuredmedia': [
          {
            id: 12345,
            media_details: {
              width: 100,
              height: 100,
              sizes: {
                large: {
                  source_url: 'https://image.test-large.jpg',
                  width: 500,
                  height: 500,
                },
              },
            },
            source_url: 'https://image.test.jpg',
          },
        ],
      },
    };
    const expected = {
      src: 'https://image.test-large.jpg',
      width: 500,
      height: 500,
      caption: '',
      alt: '',
    };
    expect(getFeaturedImage(post, 'large')).toMatchObject(expected);
  });

  test('return default dimension value of 0 if none defined', () => {
    const post = {
      _embedded: {
        'wp:featuredmedia': [
          {
            id: 12345,
            media_details: {},
            source_url: 'https://image.test.jpg',
          },
        ],
      },
    };
    const expected = {
      src: 'https://image.test.jpg',
      width: 0,
      height: 0,
      caption: '',
      alt: '',
    };
    expect(getFeaturedImage(post)).toMatchObject(expected);
  });
});

describe('getCoAuthorImage', () => {
  test('return null if no coAuthor avatar image found and no fallBackImage', () => {
    expect(getCoAuthorImage({}, 'full')).toBe(null);
  });

  test('return "full" sized avatar url if no size passed in', () => {
    const coAuthor = {
      avatar_urls: {
        full: 'https://image.test.jpg',
      },
    };
    const expected = {
      src: 'https://image.test.jpg',
      width: 100,
      height: 100,
      caption: '',
      alt: '',
    };
    expect(getCoAuthorImage(coAuthor)).toMatchObject(expected);
  });

  test('Set alt_text if display_name exists', () => {
    const coAuthor = {
      display_name: 'Display Name',
      avatar_urls: {
        full: 'https://image.test.jpg',
      },
    };
    const expected = {
      src: 'https://image.test.jpg',
      width: 100,
      height: 100,
      caption: '',
      alt: 'Avatar image for Display Name',
    };
    expect(getCoAuthorImage(coAuthor)).toMatchObject(expected);
  });

  test('return fallback image if no avatar_urls', () => {
    const coAuthor = {
      avatar_urls: {},
    };
    const expected = {
      src: 'https://image.fallback.jpg',
      width: 0,
      height: 0,
      caption: '',
      alt: '',
    };
    expect(getCoAuthorImage(coAuthor, 'full', 'https://image.fallback.jpg')).toMatchObject(expected);
  });

  test('if custom size exists use that src instead', () => {
    const coAuthor = {
      avatar_urls: {
        full: 'https://image.test.jpg',
        small: 'https://image.test-small.jpg',
      },
    };
    const expected = {
      src: 'https://image.test-small.jpg',
      width: 100,
      height: 100,
      caption: '',
      alt: '',
    };
    expect(getCoAuthorImage(coAuthor, 'small')).toMatchObject(expected);
  });
});
