export const getFeaturedImage = (post, size, fallbackImage) => {
  const image = post?._embedded?.['wp:featuredmedia']?.[0] ?? false;

  if ((!image || !image.id) && !fallbackImage) {
    return null;
  }

  const data = {
    src: fallbackImage,
    height: 0,
    width: 0,
    caption: '',
    alt: '',
  };

  if (image && image?.source_url) {
    data.src = image.source_url;
    data.width = image?.media_details?.width ?? 0;
    data.height = image?.media_details?.height ?? 0;
    data.alt = image?.alt_text ?? data.alt;
    data.caption = image?.caption?.rendered ?? data.caption;

    // Return custom size if available
    if (size && image?.media_details?.sizes?.[size]) {
      data.src = image.media_details.sizes[size].source_url;
      data.width = image.media_details.sizes[size].width;
      data.height = image.media_details.sizes[size].height;
    }
  }

  return data;
};

export const getCoAuthorImage = (coAuthor, size, fallbackImage, isOpinion = false) => {
  const image = coAuthor?.avatar_urls?.full ?? false;

  if (!image && !fallbackImage) {
    return null;
  }

  const data = {
    src: fallbackImage,
    height: 0,
    width: 0,
    caption: '',
    alt: '',
  };

  if (image) {
    data.src = image;
    data.width = 100;
    data.height = 100;
    data.alt = '';
    data.caption = '';

    if (coAuthor.display_name) {
      data.alt = `Avatar image for ${coAuthor.display_name}`;
    }

    // Return custom size if available
    if (size) {
      // Fetching author image for opinion template from opinion_avatar_urls if exists,
      // else size will be fetched from avatar_urls
      if (isOpinion && coAuthor.opinion_avatar_urls && coAuthor.opinion_avatar_urls[size]) {
        data.src = coAuthor.opinion_avatar_urls[size];
      } else if (coAuthor.avatar_urls[size]) {
        data.src = coAuthor.avatar_urls[size];
      }
    }
  }

  return data;
};
