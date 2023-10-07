let contactButtons = null;
let contactsContainer = null;
let form = null;
let formCloseButton = null;
let formElements = null;
let message = null;
let messageTitle = null;
let messageText = null;
let messageCloseButton = null;

const contactFormClosedClass = 'contacts--closed';
const messageClosedClass = 'message--closed';
const mailerURL = 'php/send_mail.php';

let isFormOpened = false;
let isMessageOpened = false;

const sucsessMessage = {
  title: 'Сообщение отправлено!',
  text: 'Благодарю за обращение! Постараюсь ответить в кратчайшее время.'
};

const errorMessage = {
  title: 'Что-то пошло не так, сообщение не отпралено!',
  text: 'Попробуйте еще раз немного позже.'
};

const closeMessageClickHandler = (evt) => {
  evt.preventDefault();

  isMessageOpened = false;

  message.classList.add(messageClosedClass);
  messageCloseButton.removeEventListener('click', closeMessageClickHandler);
  document.removeEventListener('keydown', escKeyPressHandler);
}

const escKeyPressHandler = (evt) => {
  if (evt.keyCode === 27 || evt.key === "Escape") {
    if (isFormOpened) {
      isFormOpened = false;

      contactsContainer.classList.add(contactFormClosedClass);
      formCloseButton.removeEventListener('click', closeContactsHandler);
      document.removeEventListener('keydown', escKeyPressHandler);
    } else if (isMessageOpened) {
      isMessageOpened = false;

      message.classList.add(messageClosedClass);
      messageCloseButton.removeEventListener('click', closeMessageClickHandler);
      document.removeEventListener('keydown', escKeyPressHandler);
    }
  }

};

const closeContactsHandler = (evt) => {
  evt.preventDefault();

  isFormOpened = false;

  contactsContainer.classList.add(contactFormClosedClass);
  formCloseButton.removeEventListener('click', closeContactsHandler);
  document.removeEventListener('keydown', escKeyPressHandler);
}

const formControl = (flag) => {
  formElements.forEach((element) => element.disabled = flag);
}

const onResponse = (messageObj) => {
  form.reset();
  messageTitle.textContent = messageObj.title;
  messageText.textContent = messageObj.text;

  message.classList.remove(messageClosedClass);
  isMessageOpened = true;
  messageCloseButton.addEventListener('click', closeMessageClickHandler);
  document.addEventListener('keydown', escKeyPressHandler);
}

const sendFormData = () => {
  const params = new FormData(form);
  formControl(true);

  fetch(mailerURL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: params
  })
    .then((response) => {
      formControl(false);

      if (response.status === 200) {
        onResponse(sucsessMessage);
        form.reset();
      } else {
        return response.text().then(text => { throw new Error(text) });
      }
    })
    .catch(() => onResponse(errorMessage))
    .finally(() => {
      contactsContainer.classList.add(contactFormClosedClass);
      isFormOpened = false;
    });
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();

  if (form.checkValidity()) {
    sendFormData();
  }
}

const contactButtonsClickHandler = (evt) => {
  evt.preventDefault();

  if (isFormOpened) {
    return;
  }

  isFormOpened = true;

  contactsContainer.classList.remove(contactFormClosedClass);
  formCloseButton.addEventListener('click', closeContactsHandler);
  document.addEventListener('keydown', escKeyPressHandler);
};

const initForm = () => {
  contactButtons = document.querySelectorAll('.header__contacts-button');
  contactsContainer = document.querySelector('.contacts');
  form = contactsContainer.querySelector('.contacts__form');

  if (!contactsContainer || !form || !contactButtons) {
    return;
  }

  formCloseButton = contactsContainer.querySelector('.contacts__close-button');
  formElements = form.querySelectorAll('input, textarea, button');
  message = document.querySelector('.message');
  messageTitle = message.querySelector('.message__title');
  messageText = message.querySelector('.message__text');
  messageCloseButton = message.querySelector('.message__close-button');

  contactButtons.forEach((button) => {
    button.addEventListener('click', contactButtonsClickHandler);
  });

  form.addEventListener('submit', formSubmitHandler);
};

export default initForm;
