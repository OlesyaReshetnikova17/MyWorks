import { renderPage } from '../js/main.js';

export function render(data) {
  const container = document.createElement('div');
  const filmCardWrapper = document.createElement('div');
  const appContainer = document.getElementById('app');
  const header = document.createElement('h1');

  container.classList.add('container', 'text-center');
  filmCardWrapper.classList.add('row', 'g-2');

  appContainer.style.backgroundImage = 'url(img/mainPage.jpg)';
  appContainer.style.height = '100vh';
  appContainer.style.backgroundSize = 'cover';
  appContainer.style.backgroundRepeat = 'no-repeat';
  appContainer.style.overflowY = 'auto';
  appContainer.style.backgroundPosition = 'center';

  header.classList.add('p-3', 'text-danger-emphasis', 'text-center');
  header.textContent = 'May the force be with you!';
  header.style.textShadow =
    '#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px';

  appContainer.append(header);
  container.append(filmCardWrapper);

  for (const [index, film] of data.results.entries()) {
    const filmCard = document.createElement('div');
    const yearRelease = film.release_date.slice(0, 4);
    const detailButton = document.createElement('a');

    filmCard.classList.add('col-6', 'd-flex');
    detailButton.classList.add('btn', 'btn-warning', 'w-100');

    detailButton.href = `?film=${index + 1}`;
    detailButton.textContent = `${index + 1}. ${film.title}. ${yearRelease}`;

    filmCardWrapper.append(filmCard);
    filmCard.append(detailButton);

    detailButton.addEventListener('click', e => {
      e.preventDefault();
      window.history.pushState(null, '', `?film=${index + 1}`);
      renderPage(
        '../js/film-page.js',
        `https://swapi.dev/api/films/${index + 1}`,
        'https://necolas.github.io/normalize.css/8.0.1/normalize.css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
      );
    });
  }

  return container;
}
