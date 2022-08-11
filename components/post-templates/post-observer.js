const initArticleObserver = () => {
  const articleEnd = document.querySelector('.article-end');
  if (articleEnd) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const articelEndEvent = new Event('event-article-scroll-end');
          window.dispatchEvent(articelEndEvent);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(articleEnd);
  }
};

window.addEventListener('load', initArticleObserver);
export default () => { };
