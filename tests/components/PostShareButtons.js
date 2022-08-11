import React from 'react';
import PostShareButtons from '../../components/post-meta/PostShareButtons';

const post = {
  id: 1,
  title: {
    rendered: 'title',
    raw: 'title',
  },
  social_title: {
    rendered: "Social ' Title",
  },
  link: 'https://inews-article.com/test-article',
};
const dataTrack = 'track';

test('renders the snapshot', () => {
  const postShareButtons = shallow(<PostShareButtons post={post} dataTrack={dataTrack} />);
  expect(postShareButtons).toMatchSnapshot();
});

it('correctly configures the Email <amp-social-share /> for element', () => {
  const postShareButtons = shallow(<PostShareButtons post={post} dataTrack={dataTrack} />);

  const share = postShareButtons.find('amp-social-share[type="email"]');
  expect(share.length).toBe(1);

  expect(share.prop('data-track')).toBe(`email_${dataTrack}`);
  expect(share.prop('data-param-body')).toBe(`${post.link}?ito=email_${dataTrack}`);
  expect(share.prop('data-param-subject')).toBe("Social ' Title");
});

it('correctly configures the Facebook <amp-social-share /> for element', () => {
  const postShareButtons = shallow(<PostShareButtons post={post} dataTrack={dataTrack} />);

  const share = postShareButtons.find('amp-social-share[type="facebook"]');
  expect(share.length).toBe(1);

  expect(share.prop('data-track')).toBe(`facebook_${dataTrack}`);
  expect(share.prop('data-param-href')).toBe(`${post.link}?ito=facebook_${dataTrack}`);
  expect(share.prop('data-param-quote')).toBe("Social ' Title");
  expect(share.prop('data-param-app_id')).toBe('817222585498956');
});

it('correctly configures the Twitter <amp-social-share /> for element', () => {
  const postShareButtons = shallow(<PostShareButtons post={post} dataTrack={dataTrack} />);

  const share = postShareButtons.find('amp-social-share[type="twitter"]');
  expect(share.length).toBe(1);

  expect(share.prop('data-track')).toBe(`twitter_${dataTrack}`);
  expect(share.prop('data-param-url')).toBe(`${post.link}?ito=twitter_${dataTrack}`);
  expect(share.prop('data-param-text')).toBe("Social ' Title");
});

it('correctly configures the Whatsapp <amp-social-share /> for element', () => {
  const postShareButtons = shallow(<PostShareButtons post={post} dataTrack={dataTrack} />);

  const share = postShareButtons.find('amp-social-share[type="whatsapp"]');
  expect(share.length).toBe(1);

  expect(share.prop('data-track')).toBe(`whatsapp_${dataTrack}`);
  expect(share.prop('data-param-text')).toBe(`Social ' Title - ${post.link}?ito=whatsapp_${dataTrack}`);
});
