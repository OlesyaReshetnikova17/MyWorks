import { Card } from './card.js';
import { AmazingCard } from './amazingCard.js';

let firstCard = null;
let secondCard = null;
let isTimerRunning = true;

// спрашиваем у пользователя размер поля для игры
const container = document.querySelector('.container');
const fieldset = document.createElement('fieldset');
const rule = document.createElement('p');
const buttonStart = document.createElement('button');
buttonStart.textContent = 'Начать игру';
fieldset.classList.add('startGame');
rule.classList.add('fst-italic', 'm-0');
buttonStart.classList.add('btn', 'btn-warning');
container.append( fieldset);
fieldset.append(rule, buttonStart);

// нажимаем на кнопку начала игры
buttonStart.addEventListener('click', function() {
  fieldset.remove();
  // проверяем введенные данные и вычисляем размеры игрового поля
  const playField = document.createElement('div');
  playField.classList.add('field');
  container.append(playField);



  let verticalCount = 2;
  let horizontalCount = 2;

  switch (horizontalCount) {
    case '2':
      playField.classList.add('fieldTwo');
      break;
    case '6':
      playField.classList.add('fieldSix');
      break;
    case '8':
      playField.classList.add('fieldEight');
      break;
    case '10':
      playField.classList.add('fieldTen');
      break;
  }

  verticalCount = validateCount(verticalCount);
  horizontalCount = validateCount(horizontalCount);

  const count = (verticalCount * horizontalCount) / 2;

  const cardsNumberArray = createCardNumbers(count);

  for (const cardNumber of cardsNumberArray) {
    let card = new AmazingCard(playField, cardNumber, function(card) {
      flip(card, cardsNumberArray);
    });
  }
})

// основная логика игры
function flip(card, cardsNumberArray) {
  if (card.open || card.success) return;
  card.open = true;

  if (firstCard !== null && secondCard !== null) {
    firstCard.open = false;
    secondCard.open = false;
    firstCard = null;
    secondCard = null;
  }

  if (firstCard === null) {
    firstCard = card;
  } else if (secondCard === null && firstCard !== null) {
    secondCard = card;
  }

  if (firstCard !== null && secondCard !== null && firstCard.cardNumber == secondCard.cardNumber) {
    firstCard.success = true;
    secondCard.success = true;
  }

  // выводим сообщение о победе и создаем кнопку для повторной игры
  winGame(cardsNumberArray);
}

// функция, для создания массива с перемешанными номерами для начала игры
function createCardNumbers(count) {
  // создаем массив парных чисел
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i, i);
  }

  // перемешиваем элементы в массиве
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// функция для вывода сообщения о победе
function winGame(cardsNumberArray) {
  if (cardsNumberArray.length === document.querySelectorAll('.winCard').length) {
   alert('вы победили')
   container.innerHTML = ''
   firstCard = null
   secondCard = null
   createBtnPlayAgain(container);
  }
}

// функция для создания кнопки для повторной игры
function createBtnPlayAgain(container) {
  const playAgain = document.createElement('button');
  playAgain.classList.add('btn', 'btn-success', 'mb-3');
  playAgain.textContent = 'Сыграть ещё раз';
  playAgain.addEventListener('click', () => location.reload());
  container.append(playAgain);
}




// функция, для проверки и корректировки значений для вертикального и горизонтального количества карточек
function validateCount(count) {
  if (count % 2 !== 0 || count < 2 || count > 10) {
    return 4;
  }
  return count;
}

