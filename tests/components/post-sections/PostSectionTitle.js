import React from 'react';
import PostSectionTitle from '../../../components/post-sections/PostSectionTitle';

test('Output a post section title with link', () => {
  const props = {
    title: 'test',
    link: 'https://inews.test/post-section-title',
  };
  const title = shallow(<PostSectionTitle {...props} />);

  expect(title.type()).toBe('div');
  expect(title.hasClass('inews__post-section__title')).toBe(true);
  expect(title.childAt(0).type()).toBe('h2');
  expect(title.find('h2').childAt(0).type()).toBe('a');

  expect(title.find('a').prop('href')).toBe(props.link);
  expect(title.find('a').prop('title')).toBe(props.title);
  expect(title.find('a').text()).toBe(props.title);
});


test('Output a post section title without link', () => {
  const props = {
    title: 'test',
  };
  const title = shallow(<PostSectionTitle {...props} />);

  expect(title.childAt(0).type()).toBe('h2');
  expect(title.find('h2').find('a').length).toBe(0);
  expect(title.find('h2').text()).toBe(props.title);
});
