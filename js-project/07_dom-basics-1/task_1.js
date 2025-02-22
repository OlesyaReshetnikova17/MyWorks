let name = 'Игорь'
let age = '17'
function createStudentCard() {
let div=  document.createElement('div')
document.body.append(div);

let h1 = document.createElement('h1')
h1.textContent = 'Игорь'
document.body.append(h1);

let span = document.createElement('span')
span.textContent = 'Возраст: 17 лет'
document.body.append(span);
}
createStudentCard();


