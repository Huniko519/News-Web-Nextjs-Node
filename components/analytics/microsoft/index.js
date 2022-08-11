/* eslint-disable */
(function (w, d, t, r, u) {
  let f; let n; let
    i;
  w[u] = w[u] || [], f = function () {
    const o = {
      ti: '56378606',
    };
    o.q = w[u], w[u] = new UET(o), w[u].push('pageLoad');
  }, n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () {
    const s = this.readyState;
    s && s !== 'loaded' && s !== 'complete' || (f(), n.onload = n.onreadystatechange = null);
  }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i);
}(window, document, 'script', '//bat.bing.com/bat.js', 'uetq'));

// Trigger Microsoft Ads base tracking on page load
export const uet_report_conversion = () => {
  window.uetq = window.uetq || [];
  window.uetq.push('event', 'signup', {"event_category":"newsletter"});
}

// Trigger Microsoft Ads tracking on user registration
export const uet_report_newUserReg = () => {
  window.uetq = window.uetq || [];
  window.uetq.push('event', 'user_registration', {});
}

// Trigger Microsoft Ads tracking on Puzzle open Event Handler
 const puzzleOpenButton = document.getElementById('btn-open-puzzle-lightbox');
 if (puzzleOpenButton) {
   puzzleOpenButton.addEventListener('click', () => {
     window.uetq = window.uetq || [];
     window.uetq.push('event', 'puzzle_opened', {});
   }, false);
 }

// Trigger Microsoft Ads tracking on newsletter signup
const emailSignupSubmitBtn = document.getElementById('inews__email-signup__submit__button');
if (emailSignupSubmitBtn) {
  emailSignupSubmitBtn.addEventListener('click', () => {
    if (document.querySelector('.inews_email-textbox.valid.user-valid') !== null) {
      uet_report_conversion();
      
    }
  }, false);
}

export default () => {};
