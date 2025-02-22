document.addEventListener("DOMContentLoaded", () => {
	let surname = document.getElementById("surname")
let inputName = document.getElementById("name")
let patronymic = document.getElementById("patronymic")
let button = document.getElementById("button")
let form = document.getElementById("form")

let p = document.createElement('p');

let inp = document.querySelector('.validation')

let surnameStr = inp.textContent

function validation(inp) {

inp.addEventListener('input', function () {
  this.value = this.value.replace(/^([-=\s]*)([a-zA-Z0-9])/gm, "$2");
});
inp.addEventListener('blur', function(e) {
  let val = e.target.value;
  val = val.replace(/[^а-яА-ЯЁё\s\-]/gi, '');
  val = val.replace(/^[\s\-]+/g, '');
  val = val.replace(/[\s\-]+$/g, '');
  val = val.replace(/\s{2,}/g, ' ');
  val = val.replace(/\-{2,}/g, '-');
  val = val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
  e.target.value = val;
});


}
[surname, inputName, patronymic].forEach((inp) => validation(inp));

button.onclick = function() {
  let text = surname.value + ' ' + inputName.value + ' ' +  patronymic.value;
  p.innerHTML = text;
  form.append(p)
};
});

