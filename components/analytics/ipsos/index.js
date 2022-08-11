import Utils from './Utils';

/* eslint-disable */
(function () {
  window.dm = window.dm || { AjaxData: [] };
  window.dm.AjaxEvent = function (et, d, ssid, ad) {
    dm.AjaxData.push({
      et,
      d,
      ssid,
      ad,
    });
    window.DotMetricsObj && DotMetricsObj.onAjaxDataUpdate();
  };
  const d = document;
  const h = d.getElementsByTagName("head")[0];
  const s = d.createElement("script");
  let t = "inews";
  s.type = "text/javascript";
  s.async = true;

  const checkSlug = (category) => {
    if (Utils.categoryMap[category.slug]) {
      t = Utils.categoryMap[category.slug];
    }
  }

  // Determine if the current page has a matching category
  if (window.PageContext.categories) {
    for (let category of window.PageContext.categories) {
      checkSlug(category)
      break;
    }
  }

  if (window.PageContext.post && window.PageContext.post.breadcrumbs) {
    for (let category of window.PageContext.post.breadcrumbs.reverse()) {
      checkSlug(category)
      break;
    }
  }

  // Determine if the current page is a home page
  if (window.PageContext.router.pathname === "/") {
    t = "home";
  }

  s.src = `https://uk-script.dotmetrics.net/door.js?d=${document.location.host}&t=${t}`;
  h.appendChild(s);
})();

export default () => {};
