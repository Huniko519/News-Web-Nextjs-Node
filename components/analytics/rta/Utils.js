export default {


  postParams: (post) => {
    let tags = [];
    let author = '';

    if (post.topics) {
      const topics = post.topics.map((term) => term.name.toLowerCase());
      tags = tags.concat(topics);
    }

    if (post.labels) {
      const labels = post.labels.map((term) => term.name.toLowerCase());
      tags = tags.concat(labels);
    }

    tags = tags.join(',');

    if (post['co-authors']?.[0]) {
      author = post['co-authors'].map((coAuthor) => (coAuthor.display_name || '').toLowerCase()).join(',');
    }

    return {
      author,
      pubDate: post.date,
      title: post.title.raw,
      tags,
    };
  },
};
