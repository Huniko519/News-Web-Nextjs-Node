const speed_default = 150;

const fetchSrollableContainer = (target) => target.closest('.slider-container').querySelector('.scrollable');

const sliderRightHandler = (e) => {
  const scrollable = fetchSrollableContainer(e.target);
  const scroll = scrollable.scrollLeft + speed_default;
  if (scroll < scrollable.scrollWidth) {
    scrollable.scrollTo(scroll, 0);
  } else {
    scrollable.scrollTo(scrollable.scrollWidth, 0);
  }
};

const sliderLeftHandler = (e) => {
  const scrollable = fetchSrollableContainer(e.target);
  const scroll = scrollable.scrollLeft - speed_default;
  if (scroll > 0) {
    scrollable.scrollTo(scroll, 0);
    scrollable.parentElement.querySelector('.slide-control.left').style.display = 'block';
  } else {
    scrollable.scrollTo(0, 0);
    scrollable.parentElement.querySelector('.slide-control.left').style.display = 'none';
  }
};

// Scroll event handler for slider
const scrollEventHandler = (e) => {
  const scrollContainer = e.target;
  const leftArrow = scrollContainer.parentElement.querySelector('.slide-control.left');
  const rightArrow = scrollContainer.parentElement.querySelector('.slide-control.right');

  if (scrollContainer.scrollLeft < 5) {
    leftArrow.style.display = 'none';
  } else {
    leftArrow.style.display = 'block';
  }
  if (scrollContainer.scrollLeft > (scrollContainer.scrollWidth - scrollContainer.clientWidth - 5)) {
    rightArrow.style.display = 'none';
  } else {
    rightArrow.style.display = 'block';
  }
};

window.addEventListener('load', () => {
  // Action for right arrow
  document.querySelectorAll('.slide-control.right')
    .forEach((item) => item.addEventListener('click', sliderRightHandler));
  // Action for left arrow
  document.querySelectorAll('.slide-control.left')
    .forEach((item) => item.addEventListener('click', sliderLeftHandler));

  document.querySelectorAll('.scrollable').forEach((scrollable) => scrollable.addEventListener('scroll', scrollEventHandler));
});

export default () => { };
