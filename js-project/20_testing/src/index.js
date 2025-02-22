/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import './index.html';
import './assets/main.scss';

import { el, mount } from 'redom';
import { createPayForm } from './assets/modules/createForm';
import visaImage from './assets/img/visa.svg';
import mastercardImage from './assets/img/mastercard.svg';
import maestroImage from './assets/img/maestro.svg';
import mirImage from './assets/img/mir.svg';
import unionpayImage from './assets/img/unionpay.svg';
import americanExpressImage from './assets/img/american-express.svg';
import dinersClubImage from './assets/img/diners-club.svg';
import discoverImage from './assets/img/discover.svg';
import eloImage from './assets/img/elo.svg';
import hiperImage from './assets/img/hiper.svg';
import hiperCardImage from './assets/img/hipercard.svg';
import jcbImage from './assets/img/jcb.svg';

const valid = require('card-validator');
const validator = require('email-validator');

const container = el('div', { className: 'container pt-5' });
const headingFormPayPage = el('h1', 'Форма оплаты', {
  className: 'mb-4 fs-1 fw-medium text-body-tertiary',
});
export const formCard = createPayForm();

console.log(formCard);

mount(container, headingFormPayPage);
mount(container, formCard.form);
mount(window.document.body, container);

let imageElement;
let _isValid;

function createDataValidAtributeFalse(input) {
  input.setAttribute('data-valid', false);
  _isValid = input.dataset.valid;
}

function createDataValidAtributeTrue(input) {
  input.setAttribute('data-valid', true);
  _isValid = input.dataset.valid;
}

function showErrorMessage(errorMessage, input) {
  errorMessage.style.display = 'block';
  input.classList.add('is-invalid');
}

function hideErrorMessage(errorMessage, input) {
  errorMessage.style.display = 'none';
  input.classList.remove('is-invalid');
}

function createImageLogoPaySystem(srcImage) {
  imageElement = el('img', {
    className: 'img-fluid position-absolute',
    src: srcImage,
    style: {
      top: '3px',
      right: '25px',
      width: '50px',
      borderRadius: '5px',
    },
  });
}

function getDataInput() {
  const cardNumberData = formCard.cardNumberInput.dataset.valid;
  const cardExpirationDateData = formCard.cardExpirationDateInput.dataset.valid;
  const cardCvcCvvData = formCard.cardCvcCvvInput.dataset.valid;
  const cardEmailData = formCard.cardEmailInput.dataset.valid;

  const isDisabled =
    cardNumberData !== 'true' ||
    cardExpirationDateData !== 'true' ||
    cardCvcCvvData !== 'true' ||
    cardEmailData !== 'true';
  formCard.cardFormButton.disabled = isDisabled;
}

formCard.cardNumberInput.addEventListener('blur', () => {
  const numberValidation = valid.number(formCard.cardNumberInput.value);

  if (!numberValidation.isPotentiallyValid) {
    imageElement?.remove();
    showErrorMessage(formCard.cardNumberErrorMessage, formCard.cardNumberInput);
    createDataValidAtributeFalse(formCard.cardNumberInput);
    getDataInput();
  } else {
    hideErrorMessage(formCard.cardNumberErrorMessage, formCard.cardNumberInput);
    createDataValidAtributeTrue(formCard.cardNumberInput);
    getDataInput();
  }

  if (numberValidation.card) {
    if (numberValidation.card.type === 'visa') {
      imageElement?.remove();
      createImageLogoPaySystem(visaImage);
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'mastercard') {
      imageElement?.remove();
      createImageLogoPaySystem(mastercardImage);
      imageElement.style.top = 0;
      imageElement.style.height = '38px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'maestro') {
      imageElement?.remove();
      createImageLogoPaySystem(maestroImage);
      imageElement.style.top = '-7px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'american-express') {
      imageElement?.remove();
      createImageLogoPaySystem(americanExpressImage);
      imageElement.style.top = '-2px';
      imageElement.style.height = '40px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'mir') {
      imageElement?.remove();
      createImageLogoPaySystem(mirImage);
      imageElement.style.top = '-6px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'unionpay') {
      imageElement?.remove();
      createImageLogoPaySystem(unionpayImage);
      imageElement.style.top = '-4px';
      imageElement.style.height = '45px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'diners-club') {
      imageElement?.remove();
      createImageLogoPaySystem(dinersClubImage);
      imageElement.style.top = '-4px';
      imageElement.style.height = '45px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'discover') {
      imageElement?.remove();
      createImageLogoPaySystem(discoverImage);
      imageElement.style.top = '-4px';
      imageElement.style.height = '45px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'elo') {
      imageElement?.remove();
      createImageLogoPaySystem(eloImage);
      imageElement.style.top = '-4px';
      imageElement.style.height = '45px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'hiper') {
      imageElement?.remove();
      createImageLogoPaySystem(hiperImage);
      imageElement.style.top = '-4px';
      imageElement.style.height = '45px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'hipercard') {
      imageElement?.remove();
      createImageLogoPaySystem(hiperCardImage);
      imageElement.style.top = '-7px';
      mount(formCard.cardNumberLabel, imageElement);
    }
    if (numberValidation.card.type === 'jcb') {
      imageElement?.remove();
      createImageLogoPaySystem(jcbImage);
      imageElement.style.top = '-4px';
      imageElement.style.height = '45px';
      mount(formCard.cardNumberLabel, imageElement);
    }
  }
});

formCard.cardExpirationDateInput.addEventListener('blur', () => {
  const cardExpirationDate = valid.expirationDate(
    formCard.cardExpirationDateInput.value
  );

  if (!cardExpirationDate.isPotentiallyValid) {
    showErrorMessage(
      formCard.cardExpirationDateErrorMessage,
      formCard.cardExpirationDateInput
    );
    createDataValidAtributeFalse(formCard.cardExpirationDateInput);
    getDataInput();
  } else {
    hideErrorMessage(
      formCard.cardExpirationDateErrorMessage,
      formCard.cardExpirationDateInput
    );
    createDataValidAtributeTrue(formCard.cardExpirationDateInput);
    getDataInput();
  }
});

formCard.cardCvcCvvInput.addEventListener('blur', () => {
  const cardCvcCvv = valid.cvv(formCard.cardCvcCvvInput.value);

  if (!cardCvcCvv.isValid) {
    showErrorMessage(formCard.cardCvcCvvErrorMessage, formCard.cardCvcCvvInput);
    createDataValidAtributeFalse(formCard.cardCvcCvvInput);
    getDataInput();
  } else {
    hideErrorMessage(formCard.cardCvcCvvErrorMessage, formCard.cardCvcCvvInput);
    createDataValidAtributeTrue(formCard.cardCvcCvvInput);
    getDataInput();
  }
});

formCard.cardEmailInput.addEventListener('blur', () => {
  const emailValid = validator.validate(formCard.cardEmailInput.value);

  if (emailValid !== true) {
    showErrorMessage(formCard.cardEmailErrorMessage, formCard.cardEmailInput);
    createDataValidAtributeFalse(formCard.cardEmailInput);
    getDataInput();
  } else {
    hideErrorMessage(formCard.cardEmailErrorMessage, formCard.cardEmailInput);
    createDataValidAtributeTrue(formCard.cardEmailInput);
    getDataInput();
  }
});

formCard.form.addEventListener('submit', e => {
  e.preventDefault();
});
