/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Layout from '../../components/Layout';

import stylesheet from '../../src/styles/pages/taxonomy.scss';

import PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot from '../../components/post-sections/PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot';
import PostSection1xHero2xJot1xPuff2xJot from '../../components/post-sections/PostSection1xHero2xJot1xPuff2xJot';
import PostSection1xHero2xTeaser2xJot from '../../components/post-sections/PostSection1xHero2xTeaser2xJot';
import PostSection2xTeaser2xJot1xHero from '../../components/post-sections/PostSection2xTeaser2xJot1xHero';
import PostSection1xSuperhero2xJot1xTeaser4xJot from '../../components/post-sections/PostSection1xSuperhero2xJot1xTeaser4xJot';
import PostSection1xTeaser1xJot1xHero1xTeaser1xJot from '../../components/post-sections/PostSection1xTeaser1xJot1xHero1xTeaser1xJot';
import PostSection2xTeaser1xHero2xJot1xTeaser2xJot from '../../components/post-sections/PostSection2xTeaser1xHero2xJot1xTeaser2xJot';
import PostSection1xTeaser3xJot1xMpu from '../../components/post-sections/PostSection1xTeaser3xJot1xMpu';
import PostSection4xTeaser from '../../components/post-sections/PostSection4xTeaser';
import PostSection6xPuff1xMpu from '../../components/post-sections/PostSection6xPuff1xMpu';
import PostSectionColumnists1xPodium2xTeaser1xPuff2xJot from '../../components/post-sections/PostSectionColumnists1xPodium2xTeaser1xPuff2xJot';
import PostSection1xBanner4xJot from '../../components/post-sections/PostSection1xBanner4xJot';
import PostSection1xBannerBlack4xJot from '../../components/post-sections/PostSection1xBannerBlack4xJot';
import PostSectionSkyline from '../../components/post-sections/PostSectionSkyline';
import PostSectionLayout from '../../components/post-sections/PostSectionLayout';
import PostSection2xHero4xTeaser from '../../components/post-sections/PostSection2xHero4xTeaser';
import PostSection1xHeroBox4xTeaser from '../../components/post-sections/PostSection1xHeroBox4xTeaser';
import PostSection1xHeroBox4xTeaser4xJot from '../../components/post-sections/PostSection1xHeroBox4xTeaser4xJot';
import PostSection1xPortrait1xHeroWording2xJot from '../../components/post-sections/PostSection1xPortrait1xHeroWording2xJot';
import PostSection1xPortrait3xJot from '../../components/post-sections/PostSection1xPortrait3xJot';
import PostSection1xInvertedHero1xStoryPanel3xJot from '../../components/post-sections/PostSection1xInvertedHero1xStoryPanel3xJot';

const sectionMap = {
  PostSection4xTeaser,
  PostSection6xPuff1xMpu,
  PostSection1xTeaser3xJot1xMpu,
  PostSection1xHero2xJot1xPuff2xJot,
  PostSection1xHero2xTeaser2xJot,
  PostSection2xTeaser2xJot1xHero,
  PostSection1xSuperhero2xJot1xTeaser4xJot,
  PostSection1xTeaser1xJot1xHero1xTeaser1xJot,
  PostSection2xTeaser1xHero2xJot1xTeaser2xJot,
  PostSectionColumnists1xPodium2xTeaser1xPuff2xJot,
  PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot,
  PostSection1xBanner4xJot,
  PostSection1xBannerBlack4xJot,
  PostSectionSkyline,
  PostSectionLayout,
  PostSection2xHero4xTeaser,
  PostSection1xHeroBox4xTeaser,
  PostSection1xHeroBox4xTeaser4xJot,
  PostSection1xPortrait1xHeroWording2xJot,
  PostSection1xPortrait3xJot,
  PostSection1xInvertedHero1xStoryPanel3xJot,
};

const post = (i) => ({
  'id': i,
  'title': {
    rendered: `title ${i}`,
  },
  'excerpt': {
    rendered: `excerpt ${i}`,
  },
  'breadcrumbs': [
    { name: 'News' },
  ],
  'link': `https://inews-article.com/test-article-${i}`,
  'featured_video': 'https://inews-video.com/',
  'labels': [
    {
      'id': 37992,
      'link': 'https://inews.co.uk/post-label/exclusive',
      'name': 'Exclusive',
      'slug': 'exclusive',
      'bg_color': '#e33a11',
      'text_color': 'ffffff',
    },
  ],
  'co-authors': [
    {
      display_name: `author ${i}`,
      link: `https://inews-author.com/test-author-${i}`,
    },
  ],
});
let postId = 1;
const AllPostSections = (props) => (
  <Layout {...props}>
    <style global jsx>{stylesheet}</style>
    {Object.keys(sectionMap).map((section) => {
      const LayoutComponent = sectionMap[section];
      const posts = [];

      let i = 0;
      // eslint-disable-next-line no-plusplus
      for (i; i < 15; i++) {
        posts.push(post(postId));
        // eslint-disable-next-line no-plusplus
        postId++;
      }

      return (
        <LayoutComponent
          items={posts}
          title={section}
          link="https://inews.co.uk"
          key={section}
        />
      );
    })}
  </Layout>
);

export const config = { amp: true };
export default AllPostSections;
