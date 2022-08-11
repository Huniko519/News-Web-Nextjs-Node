import React, { useContext } from 'react';
import parse from 'html-react-parser';
import styleParse from 'style-to-object';
import Config from '../config';
import Mpu from './ads/Mpu';
import PageContext from './PageContext';
import { getEmailList } from './newsletters/EmailUtils';
import EmailSignup from './newsletters/EmailSignup';

const nodeSwapDMVideo = (node, opts) => {
  const attrs = {
    'id': node.attribs?.['data-videoid'],
    'data-height': node.attribs?.height,
    'data-width': node.attribs?.width,
    'data-autoplay': opts?.autoplay || node.attribs?.['data-param-autoplay'],
    'data-mute': opts?.mute || node.attribs?.mute,
    'data-ads-params': node.attribs?.['data-param-ads_params'],
  };
  return (
    <div className="dailymotion-wrapper" {...attrs} />
  );
};

/* eslint-disable consistent-return */
export const FeaturedVideo = (props) => parse(props.content, {
  replace: (node) => nodeSwapDMVideo(node, { autoplay: true, mute: true }),
});
/* eslint-enable consistent-return */

/* eslint-disable consistent-return */
const PostContent = (props) => {
  const ctx = useContext(PageContext);

  let moneySolutionsPost = false;

  if (ctx.post?.topics && ctx.post.topics.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const topic of ctx.post.topics) {
      if (topic.name.toLowerCase() === 'money solutions') {
        moneySolutionsPost = true;
      }
    }
  }

  return parse(props.content, {
    replace: (node) => {
      /**
       * MPU Swap
       */
      if (node.attribs && node.attribs['data-ad-type'] === 'mpu'
        && node.attribs['data-pos']
        && !moneySolutionsPost) {
        return (
          <Mpu pos={node.attribs['data-pos']} />
        );
      }

      /**
       * Video Player Swap
       */
      if (node.name === 'amp-dailymotion') {
        return nodeSwapDMVideo(node);
      }

      /**
      * Newsletter Signup Swap
      */
      if (node.attribs
        && node.attribs['data-email-signup']
        && ctx.post.type !== 'post_sponsored') {
        // Determine if primary category is set
        let primaryCategoryId = false;
        ctx.post.breadcrumbs.forEach((breadcrumb) => {
          if (breadcrumb?.primary === true) {
            primaryCategoryId = breadcrumb.term_id;
          }
        });

        return (
          <EmailSignup
            customParams={getEmailList(
              ctx.post.categories,
              primaryCategoryId,
            )}
          />
        );
      }

      /**
       * Teads Advert Swap
       */
      if (node.attribs
        && node.attribs['data-ad-type'] === 'teads'
        && node.attribs['data-pos']
        && !moneySolutionsPost) {
        let replacement = '';
        replacement = <div id={node.attribs['data-pos']} className="inews__advert teads" data-pos={node.attribs['data-pos']} />;

        return replacement;
      }

      /**
       * Add ICO for related stories
       */
      if (node.attribs && node.attribs.class && node.attribs.class === 'inews__shortcode-readmoreauto_content') {
        const replacement = node;

        replacement.children.forEach((child) => {
          /* eslint-disable no-param-reassign */
          child.attribs.href = `${child.attribs.href}?ico=related_stories`;
        });

        return replacement;
      }

      /**
       * Add ICO for Read More element
       */
      if (node.attribs && node.attribs.class && node.attribs.class === 'inews__shortcode-readmore__text') {
        const replacement = node;

        replacement.children.forEach((child) => {
          if (child.type === 'tag' && child.name === 'p') {
            /* eslint-disable no-param-reassign */
            child.children[0].attribs.href = `${child.children[0].attribs.href}?ico=read_more`;
          }
        });

        return replacement;
      }

      /**
       * Add ICO for in-line links
       */
      if (node.type === 'tag' && node.name === 'p') {
        const replacement = node;

        replacement.children.forEach((child) => {
          if (child.type === 'tag' && child.name === 'a') {
            // make sure we don't override existing ICOs or add the ICO to URLs outside of the inews domain
            if (child.attribs?.href && !child.attribs.href.includes('?ico') && (child.attribs.href.includes('inews.co.uk') || child.attribs.href.includes(Config.feDomain))) {
              /* eslint-disable no-param-reassign */
              child.attribs.href = `${child.attribs.href}?ico=in-line_link`;
            }
          }
        });

        return replacement;
      }

      /**
       * Convert style attributes value from string to object
       */
      if (node.attribs?.style && typeof node.attribs.style === 'string') {
        const styleObj = {};

        try {
          styleParse(node.attribs.style, (name, value) => {
            // camelize the style name
            const styleName = name.replace(/-./g, (x) => x[1].toUpperCase());
            styleObj[styleName] = value;
          });
        } catch {
          // not performing a catch action as it's not needed
        }

        if (typeof styleObj === 'object' && Object.keys(styleObj).length > 0) {
          // If we have parsed style object set it as the style attribute
          node.attribs.style = styleObj;
        } else {
          // else remove the style attribute to prevent react error.
          delete node.attribs.style;
        }
      }
    },
  });
};
/* eslint-enable consistent-return */

export default PostContent;
