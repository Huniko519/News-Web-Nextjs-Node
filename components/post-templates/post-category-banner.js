const bannerMobileExpendHandler = () => {
  const banner = document?.querySelector('.inews__sub__header_menu');
  const expendButton = document.querySelector('.inews__sub__header_menu__expend-mobile');
  const bannerContainer = banner?.querySelector('.inews__header__inner--cat');

  // On load if content does not fit in banner container
  if (bannerContainer?.clientHeight < 50) {
    expendButton.style.display = 'none';
  } else {
    expendButton.style.display = 'block';
  }

  // On resize, check for content in container.
  window.addEventListener('resize', () => {
    if (bannerContainer.clientHeight < 50) {
      expendButton.style.display = 'none';
    } else {
      expendButton.style.display = 'block';
    }
  });

  if (expendButton !== null) {
    expendButton.addEventListener('click', (e) => {
      if (banner.classList.contains('expended')) {
        banner.classList.remove('expended');
        banner.classList.add('collapsed');
        e.target.innerHTML = 'More';
      } else {
        banner.classList.add('expended');
        banner.classList.remove('collapsed');
        e.target.innerHTML = 'Less';
      }
    });
  }
};

window.addEventListener('load', bannerMobileExpendHandler);
export default () => { };
