import React from 'react';
import PropTypes from 'prop-types';
import { getStaticDomain } from '../../utils/URL';
import ScopedColorContext from '../ScopedColorContext';

/**
 * Generates a JSX list of author links to use in the bylines
 *
 * @param {array} coAuthors
 * @return {JSX}
 */
const getAuthorLinks = (coAuthors) => {
  const authors = [];

  if (Array.isArray(coAuthors)) {
    coAuthors.forEach((author) => {
      authors.push(
        <a href={author.link} title={author.display_name}>
          {author.display_name}
        </a>,
      );
    });
  }

  return authors;
};

/**
 * Generates the JSX for a sponsored author byline
 *
 * @param {object} post Post data
 * @return {JSX}
 */
const sponsoredAuthorByline = (post) => {
  const sponsor = post.sponsor_data;
  return (
    <>
      <div className="inews__post-byline__avatar">
        {sponsor.logo?.src && sponsor.url && (
          <a className="inews__post-byline__sponsored-logo" href={sponsor.url} title={sponsor.name}>
            <amp-img
              src={sponsor.logo.src}
              alt="Sponsor logo"
              height="1"
              width="1"
              layout="responsive"
            />
          </a>
        )}
      </div>
      <div className="inews__post-byline__author-link">
        <a href={sponsor.url} title={sponsor.name}>
          {`Promoted by ${sponsor.name}`}
        </a>
      </div>
    </>
  );
};

/**
 * Generates the JSX for an author byline
 *
 * @param {object} post Post data
 * @return {JSX}
 */
const authorByline = (post) => {
  const staticDomain = getStaticDomain();
  let coAuthorAvatar = `${staticDomain}/images/placeholder/placeholder-84x84.png`;
  let coAuthorOpinionAvatar = '';
  let coAuthorJobTitle = false;
  if (post?.['co-authors'] && post['co-authors'].length === 1) {
    coAuthorAvatar = post?.['co-authors']?.[0]?.avatar_urls?.['small-1:1'] || `${staticDomain}/images/placeholder/placeholder-84x84.png`;
    coAuthorOpinionAvatar = post?.['co-authors']?.[0]?.opinion_avatar_urls?.['medium-16:9'];
    if (post?.template === 'longform') {
      // eslint-disable-next-line dot-notation
      coAuthorJobTitle = post?.['co-authors']?.[0]?.['description'];
    } else {
      // eslint-disable-next-line dot-notation
      coAuthorJobTitle = post?.['co-authors']?.[0]?.['job_title'];
    }
  } else {
    // set to false if more than one co-author so we don't display any image at all
    coAuthorAvatar = false;
  }

  const LongFormByLine = () => (
    <>
      { post?.['co-authors']
      && post['co-authors'].length > 0 && (
        <div className="inews__post-byline__author-link">
          By
          {' '}
          {getAuthorLinks(post['co-authors']).reduce((acc, item) => (
            /**
             * You can't use Array.join() with an array of JSX as it converts the objects to
             * strings and fails thus we use Array.reduce() here to accomplish the same goal
             * as joining the array.
             */
            <>
              {acc}
              {', '}
              {item}
            </>
          ))}
        </div>
      )}
      {coAuthorAvatar && (
      <div className="inews__post-byline__avatar">
        {post?.['co-authors'] && post['co-authors'].length === 1 ? (
          <a
            href={post['co-authors'][0].link}
            title={post['co-authors'][0].display_name}
          >
            <amp-img
              src={coAuthorAvatar}
              alt="author avatar image"
              height="1"
              width="1"
              layout="responsive"
            />
          </a>
        ) : (
          <amp-img
            src={coAuthorAvatar}
            alt="author avatar image"
            height="1"
            width="1"
            layout="responsive"
          />
        )}
        {post?.['co-authors'] && post['co-authors'].length > 0 && (
        <div className="inews__post-byline__author-desc">
          {coAuthorJobTitle && coAuthorJobTitle.length > 0 && (
          <div className="inews__post-byline__author-job_title">
            {coAuthorJobTitle}
          </div>
          )}
        </div>
        )}
      </div>
      )}
    </>
  );
  const DefaultByLine = () => (
    <>
      {coAuthorAvatar
        && (
          <div className="inews__post-byline__avatar">
            {post?.['co-authors'] && post['co-authors'].length === 1
              ? (
                <a href={post['co-authors'][0].link} title={post['co-authors'][0].display_name}>
                  <amp-img src={coAuthorAvatar} alt="author avatar image" height="1" width="1" layout="responsive" />
                </a>
              ) : (
                <amp-img src={coAuthorAvatar} alt="author avatar image" height="1" width="1" layout="responsive" />
              )}

          </div>
        )}

      {post?.['co-authors'] && post['co-authors'].length > 0
        && (
          <div className="inews__post-byline__author-link">
            By
            {' '}
            {getAuthorLinks(post['co-authors']).reduce((acc, item) => (
              /**
               * You can't use Array.join() with an array of JSX as it converts the objects to
               * strings and fails thus we use Array.reduce() here to accomplish the same goal
               * as joining the array.
               */
              <>
                {acc}
                {', '}
                {item}
              </>
            ))}
            {coAuthorJobTitle && coAuthorJobTitle.length > 0
              && (
                <div className="inews__post-byline__author-job_title">{coAuthorJobTitle}</div>
              )}
          </div>
        )}
    </>
  );

  const OpinionByLine = () => (
    <>
      {coAuthorOpinionAvatar
        && (
          <div className="inews__post-byline__avatar">
            {post?.['co-authors'] && post['co-authors'].length === 1
              ? (
                <a href={post['co-authors'][0].link} title={post['co-authors'][0].display_name}>
                  <amp-img src={coAuthorOpinionAvatar} alt="author avatar image" height="9" width="16" layout="responsive" />
                </a>
              ) : (
                <amp-img src={coAuthorOpinionAvatar} alt="author avatar image" height="9" width="16" layout="responsive" />
              )}

          </div>
        )}

      {post?.['co-authors'] && post['co-authors'].length > 0
        && (
          <div className="inews__post-byline__author-link">
            <div className="ban__opinion">Opinion</div>
            <div className="co-author">
              By
              {' '}
              {getAuthorLinks(post['co-authors']).reduce((acc, item) => (
              /**
               * You can't use Array.join() with an array of JSX as it converts the objects to
               * strings and fails thus we use Array.reduce() here to accomplish the same goal
               * as joining the array.
               */
                <>
                  {acc}
                  {', '}
                  {item}
                </>
              ))}
            </div>
            {coAuthorJobTitle && coAuthorJobTitle.length > 0
              && (
                <div className="inews__post-byline__author-job_title">{coAuthorJobTitle}</div>
              )}
          </div>
        )}
    </>
  );
  if (post?.template === 'opinion') {
    return <OpinionByLine />;
  }
  if (post?.template === 'longform') {
    return <LongFormByLine />;
  }
  return <DefaultByLine />;
};

/**
 *  Outputs a the author byline for articles, will vary for sponsored posts.
 */
const PostByline = (props) => {
  const { post } = props;
  const isSponsored = post.type === 'post_sponsored';
  const byline = isSponsored && post?.sponsor_data?.name
    ? sponsoredAuthorByline(post)
    : authorByline(post);

  const colorKeys = (post.breadcrumbs) ? post.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse() : [post.breadcrumbs[0]?.slug];
  return (
    <ScopedColorContext colorKeys={colorKeys}>
      <div className={`inews__post-byline row middle-xs ${isSponsored ? 'inews__post-byline__sponsored' : ''}`}>
        {byline}
      </div>
    </ScopedColorContext>
  );
};

PostByline.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostByline;
