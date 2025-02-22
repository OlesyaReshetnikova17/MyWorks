/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { el, setChildren } from 'redom';
import Inputmask from 'inputmask';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export function createPayForm() {
  const form = el('form', {
    className: 'form d-flex flex-column',
    action: '#',
  });

  const cardNumberLabel = el('label', {
    className: 'mb-3 position-relative card-number-label',
    for: 'cardNumber',
  });

  const cardNumberInput = el('input', {
    className: 'form-control card-number-input',
    id: 'cardNumber',
    placeholder: 'Номер карты',
    'data-valid': 'false',
    required: true,
  });

  const cardNumberErrorMessage = el(
    'p',
    'Введите номер карты в нужном формате XXXX X...',
    {
      className: 'error-message position-absolute text-danger',
      style: { top: '-25px', left: '10px', display: 'none' },
    }
  );

  const cardExpirationDateLabel = el('label', {
    className: 'mb-3 position-relative card-expiration-date-label',
    for: 'cardExpirationDate',
  });

  const cardExpirationDateInput = el('input', {
    className: 'form-control card-expiration-date-input',
    id: 'cardExpirationDate',
    placeholder: 'ММ/ГГ',
    'data-valid': 'false',
    required: true,
  });

  const cardExpirationDateErrorMessage = el(
    'p',
    'Введите срок действия карты в формате ХХ/ХХ',
    {
      className: 'error-message position-absolute text-danger',
      style: { top: '-25px', left: '10px', display: 'none' },
    }
  );

  const cardCvcCvvLabel = el('label', {
    className: 'mb-3 position-relative card-cvc-cvv-label',
    for: 'cardCvcCvv',
  });

  const cardCvcCvvInput = el('input', {
    className: 'form-control card-cvc-cvv-input',
    id: 'cardCvcCvv',
    placeholder: 'CVC/CVV',
    'data-valid': 'false',
    required: true,
  });

  const cardCvcCvvErrorMessage = el(
    'p',
    'Введите CVC/CVV (3 цифры на обороте карты)',
    {
      className: 'error-message position-absolute text-danger',
      style: { top: '-25px', left: '10px', display: 'none' },
    }
  );

  const cardEmailLabel = el('label', {
    className: 'mb-3 position-relative card-email-label',
    for: 'cardEmail',
  });

  const cardEmailInput = el('input', {
    className: 'form-control card-email-input',
    id: 'cardEmail',
    placeholder: 'E-mail',
    'data-valid': 'false',
    required: true,
  });

  const cardEmailErrorMessage = el('p', 'Email должен содержать "@" и "."', {
    className: 'error-message position-absolute text-danger',
    style: { top: '-25px', left: '10px', display: 'none' },
  });

  const cardFormButton = el('button', 'Оплатить', {
    className: 'btn btn-primary w-25',
    disabled: 'true',
  });

  // mount(cardNumberLabel, cardNumberInput);
  setChildren(cardNumberLabel, [cardNumberInput, cardNumberErrorMessage]);
  setChildren(cardExpirationDateLabel, [
    cardExpirationDateInput,
    cardExpirationDateErrorMessage,
  ]);
  setChildren(cardCvcCvvLabel, [cardCvcCvvInput, cardCvcCvvErrorMessage]);
  setChildren(cardEmailLabel, [cardEmailInput, cardEmailErrorMessage]);

  setChildren(form, [
    cardNumberLabel,
    cardExpirationDateLabel,
    cardCvcCvvLabel,
    cardEmailLabel,
    cardFormButton,
  ]);

  const masknumberCard = Inputmask('9999 9999 9999 9999 [99]');
  masknumberCard.mask(cardNumberInput);

  const maskExpirationDate = Inputmask('99/99');
  maskExpirationDate.mask(cardExpirationDateInput);

  const maskNumberCvcCvv = Inputmask('999');
  maskNumberCvcCvv.mask(cardCvcCvvInput);

  const maskEmail = Inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
    greedy: false,
    onBeforePaste(pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace('mailto:', '');
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        casing: 'lower',
      },
    },
  });
  maskEmail.mask(cardEmailInput);

  return {
    form,
    cardNumberLabel,
    cardNumberInput,
    cardNumberErrorMessage,
    cardExpirationDateLabel,
    cardExpirationDateInput,
    cardExpirationDateErrorMessage,
    cardCvcCvvLabel,
    cardCvcCvvInput,
    cardCvcCvvErrorMessage,
    cardEmailLabel,
    cardEmailInput,
    cardEmailErrorMessage,
    cardFormButton,
  };
}
