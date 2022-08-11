import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageContext from '../PageContext';
import PostSection4xTeaser from './PostSection4xTeaser';
import PostSection6xPuff1xMpu from './PostSection6xPuff1xMpu';
import PostSection1xTeaser3xJot1xMpu from './PostSection1xTeaser3xJot1xMpu';
import PostSection1xHero2xJot1xPuff2xJot from './PostSection1xHero2xJot1xPuff2xJot';
import PostSection1xHero2xTeaser2xJot from './PostSection1xHero2xTeaser2xJot';
import PostSection2xTeaser2xJot1xHero from './PostSection2xTeaser2xJot1xHero';
import PostSection1xSuperhero2xJot1xTeaser4xJot from './PostSection1xSuperhero2xJot1xTeaser4xJot';
import PostSection1xTeaser1xJot1xHero1xTeaser1xJot from './PostSection1xTeaser1xJot1xHero1xTeaser1xJot';
import PostSection2xTeaser1xHero2xJot1xTeaser2xJot from './PostSection2xTeaser1xHero2xJot1xTeaser2xJot';
import PostSectionColumnists1xPodium2xTeaser1xPuff2xJot from './PostSectionColumnists1xPodium2xTeaser1xPuff2xJot';
import PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot from './PostSection1xJot1xHero2xJot2xTeaser1xPuff2xJot1xPuff5xJot';
import Leaderboard from '../ads/Leaderboard';
import ScopedColorContext from '../ScopedColorContext';
import PostSection1xBanner4xJot from './PostSection1xBanner4xJot';
import PostSection1xBannerBlack4xJot from './PostSection1xBannerBlack4xJot';
import PostSectionSkyline from './PostSectionSkyline';
import PostSectionEmbedded from './PostSectionEmbedded';
import PostSection2xHero4xTeaser from './PostSection2xHero4xTeaser';
import PostSection1xHeroBox4xTeaser from './PostSection1xHeroBox4xTeaser';
import PostSection1xHeroBox4xTeaser4xJot from './PostSection1xHeroBox4xTeaser4xJot';
import PostSection1xPortrait1xHeroWording2xJot from './PostSection1xPortrait1xHeroWording2xJot';
import PostSection1xPortrait3xJot from './PostSection1xPortrait3xJot';
import PostSection1xInvertedHero1xStoryPanel3xJot from './PostSection1xInvertedHero1xStoryPanel3xJot';
import ContentSlider from '../widgets/ContentSlider';
import NewsletterSplash from '../widgets/NewsletterSplash';
import PopularPostsWidget from '../widgets/PopularPostsWidget';
import PuzzlesWidget from '../widgets/PuzzlesWidget';

/**
 * Post section widget id base as defined in the CMS
 */
const sectionWidgetIdBase = 'inews_post_section_widget';
const skylineSectionIdBase = 'inews_skylines_widget';
const embeddedSectionIdBase = 'inews_embedded_post_section_widget';
const carouselIdBase = 'inews_carousel_widget';
const newsletterSplashIdBase = 'inews_newsletter_widget';
const popularPostsIdBase = 'inews_popular_posts_widget';
const puzzlesIdBase = 'inews_puzzles_widget';

/**
 * Maps the template string names to the matching react components
 */
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
  PostSection2xHero4xTeaser,
  PostSection1xHeroBox4xTeaser,
  PostSection1xHeroBox4xTeaser4xJot,
  PostSection1xPortrait1xHeroWording2xJot,
  PostSection1xPortrait3xJot,
  PostSection1xInvertedHero1xStoryPanel3xJot,
};

/**
 * class PostSectionLayout
 */
class PostSectionLayout extends Component {
  /* eslint-disable class-methods-use-this */
  getCustomClassName(widget) {
    const classNameBase = 'inews__post-section';
    const classNames = [];
    if (widget?.options?.zone_slug) {
      classNames.push(`${classNameBase}__zone-${widget.options.zone_slug}`);
    }

    if (widget?.options?.tag_slug) {
      classNames.push(`${classNameBase}__tag-${widget.options.tag_slug}`);
    }

    if (widget?.options?.cat_slug) {
      classNames.push(`${classNameBase}__cat-${widget.options.cat_slug}`);
    }

    if (widget?.options?.author_slug) {
      classNames.push(`${classNameBase}__author-${widget.options.author_slug}`);
    }

    return classNames.join(' ');
  }

  /**
   * Outputs posts in canonical order using the default layout of components below
   *
   */
  defaultLayout() {
    const { posts } = this.props;
    return (
      Array.isArray(posts)
        ? (
          <>
            <PostSection4xTeaser items={posts.slice(0, 4)} />
            <PostSection1xTeaser3xJot1xMpu items={posts.slice(4, 8)} pos="r1" />
            <PostSection4xTeaser items={posts.slice(8, 12)} />
          </>
        )
        : null
    );
  }

  /**
     * Loops over all of the sidebar widgets and matches them to the relevant react component
     * to create our custom layout.
     *
     */

  leaderboardAd(count) {
    return (
      <div className="inews__post-section__leaderboard-ad" key={`leader_${count}`}>
        <Leaderboard className="lg xl" key={`leader_hp_${count}`} pos={`leader_hp_${count}`} />
        <Leaderboard className="md" key={`leader_hp_tablet_${count}`} pos={`leader_hp_tablet_${count}`} />
      </div>
    );
  }

  customLayout() {
    const { sidebar, injectAds } = this.props;
    const { widgets } = sidebar._embedded;
    const sections = [];
    let sectionsCount = 0;
    let LeaderboardCount = 0;
    let skylineWidget = {};
    // eslint-disable-next-line array-callback-return
    widgets.map((widget) => {
      if (widget.id_base === carouselIdBase) {
        sections.push(<ContentSlider key={widget.id} authorInfo={widget.posts_json[0]} />);
      }

      if (widget.id_base === newsletterSplashIdBase && widget?.posts_json?.[0]) {
        sections.push(<NewsletterSplash key={widget.id} posts={widget?.posts_json?.[0]} />);
      }

      if (widget.id_base === popularPostsIdBase && widget?.posts_json?.[0]) {
        sections.push(<PopularPostsWidget key={widget.id} widget={widget} />);
      }

      if (widget.id_base === puzzlesIdBase) {
        sections.push(<PuzzlesWidget key={widget.id} widget={widget} />);
      }

      if (
        (widget.id_base === sectionWidgetIdBase
          || widget.id_base === skylineSectionIdBase
          || widget.id_base === embeddedSectionIdBase
        ) && widget?.posts_json?.[0]) {
        const LayoutComponent = sectionMap[widget.options.template] ?? PostSection4xTeaser;
        const hideLabels = widget?.options?.hide_labels ?? false;
        let items = widget.posts_json;

        if (hideLabels) {
          items = items.map((item) => ({ ...item, labels: [] }));
        }

        if (widget.id_base === skylineSectionIdBase) {
          skylineWidget = { ...widget };
        }

        if (LayoutComponent) {
          // These are in order of prefernce for post section color sets.
          let colors = [
            widget?.options?.color_override ?? '',
            widget?.options?.zone_slug ?? '',
            widget?.options?.tag_slug ?? '',
            widget?.options?.cat_slug ?? '',
            widget?.options?.cat_parent_slug ?? '',
          ];

          // Add category slugs from pageData if defined.
          // eslint-disable-next-line react/destructuring-assignment
          if (this?.context?.pageData) {
            const { pageData: { subCategory, topCategory } } = this.context;
            colors.push(subCategory ?? '');
            colors.push(topCategory ?? '');
          }

          // Remove falsy values
          colors = colors.filter(Boolean);
          // Duplicate the Skyline on the homepage to the third position
          if (skylineWidget.id_base === skylineSectionIdBase && sectionsCount === 3) {
            sections.push(
              <PostSectionSkyline
                key={sectionsCount}
                items={skylineWidget.posts_json}
                title={skylineWidget?.options?.title}
                link={skylineWidget?.options?.link}
                pos={skylineWidget?.options?.ad_pos}
                showAuthor={skylineWidget?.options?.show_author ?? false}
                showPubDate={skylineWidget?.options?.show_pub_date ?? false}
                panelLabel={skylineWidget?.options?.panel_label ?? ''}
                panelLabelLink={skylineWidget?.options?.panel_label_link ?? ''}
                className={this.getCustomClassName(skylineWidget)}
              />,
            );
          }
          if (widget.id_base === embeddedSectionIdBase) {
            sections.push(
              <ScopedColorContext colorKeys={colors} key={widget.id}>
                <PostSectionEmbedded
                  key={sectionsCount}
                  items={items}
                  title={widget?.options?.title}
                  type={widget?.options?.type}
                  iframe_source={widget?.options?.iframe_source}
                  image_destination={widget?.options?.image_destination}
                  image_src={widget?.options?.image_src}
                  className={this.getCustomClassName(widget)}
                />
              </ScopedColorContext>,
            );
          } else {
            sections.push(
              <ScopedColorContext colorKeys={colors} key={widget.id}>
                <LayoutComponent
                  key={sectionsCount}
                  items={items}
                  title={widget?.options?.title}
                  link={widget?.options?.link}
                  pos={widget?.options?.ad_pos}
                  showAuthor={widget?.options?.show_author ?? false}
                  showPubDate={widget?.options?.show_pub_date ?? false}
                  panelLabel={widget?.options?.panel_label ?? ''}
                  panelLabelLink={widget?.options?.panel_label_link ?? ''}
                  className={this.getCustomClassName(widget)}
                />
              </ScopedColorContext>,
            );
          }

          if (injectAds) {
            sectionsCount += 1;
            if (sectionsCount === 4) {
              LeaderboardCount += 1;
              sections.push(
                this.leaderboardAd(LeaderboardCount),
              );
            } else if (sectionsCount > 4 && sectionsCount % 3 === 1) {
              LeaderboardCount += 1;
              sections.push(
                this.leaderboardAd(LeaderboardCount),
              );
            }
          }
        }
      }
    });

    return sections.length > 0 ? (
      <>
        {sections}
      </>
    ) : null;
  }

  render() {
    const { sidebar } = this.props;
    // If widgets are defined in a sidebar then we opt for a custom layout
    const layout = sidebar?._embedded?.widgets?.[0] ? this.customLayout() : this.defaultLayout();

    return layout;
  }
}

PostSectionLayout.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any),
  sidebar: PropTypes.objectOf(PropTypes.any),
  injectAds: PropTypes.bool,
};

PostSectionLayout.defaultProps = {
  posts: [],
  sidebar: {},
  injectAds: false,
};

PostSectionLayout.contextType = PageContext;
export default PostSectionLayout;
