const VEWPORTS = {
  desktop: 1140
};

let menuButton = null;
let menu = null;

const mediaQueryList = window.matchMedia(`(min-width: ${VEWPORTS.desktop}px)`);
const menuButtonCloseClass = 'header__menu-button--close';
const menuButtonNoJsClass = 'header__menu-button--nojs';
const headerMainMenuOpenClass = 'header__nav--open';
const headerMainMenuCloseClass = 'header__nav--close';
const headerMainMenuNoJsClass = 'header__nav--nojs';

let isSettedListener = false;

const mouseUpHandler = (evt) => {
  if (evt.target.closest('a') || evt.target.closest('button')) {
    evt.preventDefault();

    menuButton.classList.remove(menuButtonCloseClass);
    menu.classList.remove(headerMainMenuOpenClass);
    menu.classList.add(headerMainMenuCloseClass);
  }
};

const menuButtonClickHandler = (evt) => {
  evt.preventDefault();
  menuButton.classList.toggle(menuButtonCloseClass);
  menu.classList.toggle(headerMainMenuOpenClass);
  menu.classList.toggle(headerMainMenuCloseClass);
};

const removeMainNavListener = () => {
  menu.removeEventListener('mouseup', mouseUpHandler);
};

const addMainNavListener = () => {
  menu.addEventListener('mouseup', mouseUpHandler);
};

const addmenuButtonListener = () => {
  if (!isSettedListener) {
    menuButton.addEventListener('click', menuButtonClickHandler);
    addMainNavListener();
    menu.classList.add(headerMainMenuCloseClass)
    isSettedListener = true;
  }
};

const removemenuButtonListener = () => {
  if (isSettedListener) {
    menuButton.removeEventListener('click', menuButtonClickHandler);
    removeMainNavListener();
    menuButton.classList.remove(menuButtonCloseClass);
    menu.classList.remove(headerMainMenuOpenClass);
    menu.classList.remove(headerMainMenuCloseClass);
    isSettedListener = false;
  }
};

const screenSizeChangeHandler = (mql) => {
  if (mql.matches) {
    removemenuButtonListener();
  } else {
    addmenuButtonListener();
  }
};

const initMenuPopup = () => {
  menuButton = document.querySelector('.header__menu-button');
  menu = document.querySelector('.header__nav');

  menuButton.classList.contains(menuButtonNoJsClass) ? menuButton.classList.remove(menuButtonNoJsClass) : '';
  menu.classList.contains(headerMainMenuNoJsClass) ? menu.classList.remove(headerMainMenuNoJsClass) : '';
  menu.classList.contains(headerMainMenuCloseClass) ? '' : menu.classList.add(headerMainMenuCloseClass);

  addmenuButtonListener();

  screenSizeChangeHandler(mediaQueryList);

  mediaQueryList.addEventListener('change', screenSizeChangeHandler);
};

export default initMenuPopup;
