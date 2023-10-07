const slidesHideClass = 'visually-hidden';
const slidesCurrentClass = 'promo__action--current'
const paginationNoJSClass = 'pagination--nojs';

let slides = null;
let currentPage = null;
let currentSlide = 0;

const classToggler = (slide) => {
  slides[currentSlide].classList.add(slidesHideClass);
  slides[currentSlide].classList.remove(slidesCurrentClass);
  slides[slide].classList.remove(slidesHideClass);
  slides[slide].classList.add(slidesCurrentClass);

  currentSlide = slide;
  currentPage.textContent = currentSlide + 1;
}

const prevButtonClickHandler = function (evt) {
  evt.preventDefault();

  const prevSlide = (currentSlide <= 0) ? slides.length - 1 : currentSlide - 1;
  classToggler(prevSlide);
}

const nextButtonClickHandler = function (evt) {
  evt.preventDefault();

  const nextSlide = (currentSlide >= slides.length - 1) ? 0 : currentSlide + 1;
  classToggler(nextSlide);
}

const initSlider = () => {
  let paginationContainer = null;
  let prevButton = null;
  let nextButton = null;

  const slidesContainer = document.querySelector('.page-main__slider');


  if (slidesContainer) {
    slides = slidesContainer.querySelectorAll('.promo__action');
  }

  if (slides) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.add(slidesHideClass);
    }

    paginationContainer = slidesContainer.querySelector('.pagination');
    paginationContainer.classList.remove(paginationNoJSClass);
    const totalPages = slidesContainer.querySelector('.pagination__page--total');
    currentPage = slidesContainer.querySelector('.pagination__page--current');
    prevButton = paginationContainer.querySelector('.pagination__button--prev');
    nextButton = paginationContainer.querySelector('.pagination__button--next');

    totalPages.textContent = `/${slides.length}`;
    currentPage.textContent = currentSlide + 1;

    classToggler(currentSlide);
  }

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', prevButtonClickHandler);
    nextButton.addEventListener('click', nextButtonClickHandler);
  }
};

export default initSlider;
