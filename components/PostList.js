import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component outputs a Load More button that will load in 15 postPuffs at a time until the
 * given endpoint is exhausted of posts.
 *
 * The PostList is comprised of three amp components, amp-form, amp-state and amp-list. This
 * components works as such:
 *
 * 1) On page load we define the initial state of the 'inewsAmpStatePostList' amp-state component
 *    with 'offset', 'perPage', 'more' (bool) and an empty 'items' array. Additionally the src of
 *    the amp-list is bound to the value of 'items'.
 * 2) The user clicks on the Show More button, which is the submit button of the amp-form element.
 * 3) The amp-form element makes a GET XHR request to the wp-api url defined in props.next using the
 *    'offset' value set in the amp-state component.
 * 4) On the amp-form:submit-success event we update the 'inewsAmpStatePostList' amp-state component
 *    with the event data returned from the get request above. We concatenate the new
 *    'event.response.items' returned by the GET request into the existing amp-state 'items' array,
 *    increase the 'offset' by 'perPage' and set 'more' to the boolean existence
 *    of 'event.response.next'.
 * 5) As soon as we update the amp-state 'items' array with new items, the amp-list component will
 *    re-render to display the new items.
 * 6) Steps 2-5 repeat until the amp-state 'more' value is set to false, at that point we hide the
 *    submit button of the amp-form as there are no more posts to be shown to the user.
 *
 * @param {next: (string) wp-api url to consume, offset: (integer), perPage: (integer)} props
 */
const PostList = (props) => {
  const { next, offset, perPage } = props;

  return (
    <div className="inews__post-list">
      <amp-state id="inewsAmpStatePostList">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html:
              `{
              "offset": ${offset},
              "perPage": ${perPage},
              "items": [],
              "more": true
            }`,
          }}
        />
      </amp-state>

      <amp-list
        id="PostList"
        className="inews__post-list__amp-list"
        data-amp-bind-src="inewsAmpStatePostList.items"
        binding="refresh"
        layout="fixed-height"
        width="auto"
        height="0"
      >
        <div>
          <template
            type="amp-mustache"
            dangerouslySetInnerHTML={{
              __html:
                `<div class="inews__post inews__post-puff">
                        <div class="inews__post-puff__media">
                            <a href="{{link}}" title="{{title.rendered}}">
                            {{#_embedded.wp:featuredmedia.0.media_details.sizes.small-1:1.source_url}}
                                <amp-img src="{{_embedded.wp:featuredmedia.0.media_details.sizes.small-1:1.source_url}}" width="155" height="155" layout="fixed"></amp-img>
                            {{/_embedded.wp:featuredmedia.0.media_details.sizes.small-1:1.source_url}}
                            {{^_embedded.wp:featuredmedia.0.media_details.sizes.small-1:1.source_url}}
                                <amp-img src="/static/images/placeholder/placeholder-84x84.png" width="155" height="155" layout="fixed"></amp-img>
                            {{/_embedded.wp:featuredmedia.0.media_details.sizes.small-1:1.source_url}}
                            </a>
                            {{#featured_video}}
                            <span class="inews__post__video-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"></path>
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                </svg>
                            </span>
                            {{/featured_video}}
                        </div>
                        <div class="inews__post-puff__content">
                                {{#sponsor_data.name}}
                                    <span class="inews__post__sponsored-label  inews__post__badge"><span>Promoted Content</span></span>
                                {{/sponsor_data.name}}
                                {{^sponsor_data.name}}
                                    {{#breadcrumbs.1.link}}
                                        <span class="inews__post__category  inews__post__badge">
                                            <a href="{{breadcrumbs.1.link}}" title="{{{breadcrumbs.1.name}}}">{{{breadcrumbs.1.name}}}</a>
                                        </span>
                                    {{/breadcrumbs.1.link}}
                                    {{^breadcrumbs.1.link}}
                                        {{#breadcrumbs.0.link}}
                                        <span class="inews__post__category  inews__post__badge">
                                            <a href="{{breadcrumbs.0.link}}" title="{{{breadcrumbs.0.name}}}">{{{breadcrumbs.0.name}}}</a>
                                        </span>
                                        {{/breadcrumbs.0.link}}
                                    {{/breadcrumbs.1.link}}
                                {{/sponsor_data.name}}

                              <div class="inews__post-puff__content-headline">
                                <h2>
                                {{#review}}
                                <a class="inews__post__review-stars__{{review}}" href="{{link}}" title="{{title.rendered}}">
                                  {{#social_title.rendered}}
                                    {{social_title.rendered}}
                                  {{/social_title.rendered}}
                                  {{^social_title.rendered}}
                                    {{title.rendered}}
                                  {{/social_title.rendered}}
                                </a>
                                {{/review}}
                                {{^review}}
                                    <a href="{{link}}" title="{{title.rendered}}">
                                      {{#social_title.rendered}}
                                        {{social_title.rendered}}
                                      {{/social_title.rendered}}
                                      {{^social_title.rendered}}
                                        {{title.rendered}}
                                      {{/social_title.rendered}}
                                    </a>
                                {{/review}}
                                </h2>
                              </div>
                    </div>
                </div>`,
            }}
          />
        </div>
      </amp-list>

      <form
        method="GET"
        action={next}
        action-xhr={next}
        target="_top"
        on="submit-success:PostList.changeToLayoutContainer(),AMP.setState({
                    inewsAmpStatePostList: {
                        items: inewsAmpStatePostList.items.concat(event.response.items),
                        offset: inewsAmpStatePostList.offset + inewsAmpStatePostList.perPage,
                        more: !!event.response.next
                    }
                 });"
      >
        <input type="hidden" name="offset" value={offset} data-amp-bind-value="inewsAmpStatePostList.offset" />
        <input type="hidden" name="per_page" value={perPage} />
        <div className="" data-amp-bind-hidden="!inewsAmpStatePostList.more">
          <button type="submit" className="inews__post-list__more" id="inews__post-list__more">
            <span className="inews__post-list__more-loader">Loading...</span>
            <span className="inews__post-list__more-text">Show More</span>
          </button>
        </div>
      </form>
    </div>
  );
};

PostList.propTypes = {
  next: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  perPage: PropTypes.number,
};

PostList.defaultProps = {
  perPage: 15,
};

export default PostList;
