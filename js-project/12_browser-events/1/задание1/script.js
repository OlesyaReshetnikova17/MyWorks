document.addEventListener("DOMContentLoaded", () => {
const openButton = document.querySelector('.btn');
const menu = document.querySelector ('.menu');


openButton.addEventListener('click', () => {
    menu.style.display = "block";
});

document.querySelector('.dropdown').addEventListener('click', event => {
    event._isClickWith = true;
});
document.addEventListener('click', event => {
    if (event._isClickWith) return;
    menu.style.display = 'none';
});
});