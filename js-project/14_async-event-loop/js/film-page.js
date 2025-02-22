import { renderPage } from './main.js';

export function render(data) {

  console.log(data);
  const appContainer = document.getElementById('app');
  const buttonBack = document.createElement('button');
  const container = document.createElement('div');
  const header = document.createElement('h1');
  const episode = document.createElement('h3');
  const director = document.createElement('h5');
  const producer = document.createElement('h5');
  const cardText = document.createElement('p');
  const wrapperPlanets = document.createElement('div');
  const planetsHeader = document.createElement('h3');
  const wrapperSpecies = document.createElement('div');
  const speciesHeader = document.createElement('h3');
  const wrapperStarships = document.createElement('div');
  const starshipsHeader = document.createElement('h3');
  const wrappercharacters = document.createElement('div');
  const wrappercharactersHeader = document.createElement('h3');

  let planetslist;
  let specieslist;
  let starshipslist;
  let characterslist;

  appContainer.classList.add('position-relative');
  appContainer.style.height = '100vh';
  appContainer.style.backgroundSize = 'cover';
  appContainer.style.backgroundRepeat = 'no-repeat';
  appContainer.style.overflowY = 'auto';

  container.classList.add('container', 'text-center', 'text-warning');
  container.style.textShadow = '0px 0px 2px #ffc107';

  header.classList.add('mb-3');
  header.style.paddingTop = '100px';

  cardText.classList.add('card-text', 'm-3');

  buttonBack.classList.add('btn', 'position-absolute', 'btn-outline-light');
  buttonBack.style.top = '50px';
  buttonBack.style.left = '40px';

  buttonBack.textContent = 'Back to episodes';
  header.textContent = data.title;
  episode.textContent = `Episode ${letter(data.episode_id)}`;
  director.textContent = `Director ${data.director} `;
  producer.textContent = `Producer ${data.producer}`;
  cardText.textContent = data.opening_crawl;
  planetsHeader.textContent = 'Planets';
  speciesHeader.textContent = 'Species';
  starshipsHeader.textContent = 'Starships';
  wrappercharactersHeader.textContent = 'Characters';

  // Для каждого id загрузаеться свой фон
  document.body.style.transition = '2s';
  if (data.episode_id === 4) {
    appContainer.style.backgroundImage = 'url(img/1977.jpg)';
  }
  if (data.episode_id === 5) {
    appContainer.style.backgroundImage = 'url(img/1980.jpg)';
  }
  if (data.episode_id === 6) {
    appContainer.style.backgroundImage = 'url(img/1983.jpg)';
  }
  if (data.episode_id === 1) {
    appContainer.style.backgroundImage = 'url(img/1999.jpg)';
  }
  if (data.episode_id === 2) {
    appContainer.style.backgroundImage = 'url(img/2002.jpg)';
  }
  if (data.episode_id === 3) {
    appContainer.style.backgroundImage = 'url(img/2005.jpg)';
  }

  wrapperPlanets.append(planetsHeader);
  wrapperSpecies.append(speciesHeader);
  wrapperStarships.append(starshipsHeader);
  wrappercharacters.append(wrappercharactersHeader);

  details(data.planets, planetslist, wrapperPlanets);
  details(data.species, specieslist, wrapperSpecies);
  details(data.starships, starshipslist, wrapperStarships);
  details(data.characters, characterslist, wrappercharacters);

  appContainer.append(buttonBack);
  container.append(
    header,
    episode,
    director,
    producer,
    cardText,
    wrapperPlanets,
    wrapperSpecies,
    wrapperStarships,
    wrappercharacters
  );

  buttonBack.addEventListener('click', e => {
    e.preventDefault();
    window.history.back();

    renderPage(
      '../js/film-list.js',
      `https://swapi.dev/api/films`,
      'https://necolas.github.io/normalize.css/8.0.1/normalize.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
    );
  });

  return container;
}

// Присваиваем римскую цивру к номеру эпизода
function letter(x) {
  if (x == 1) x = 'I';
  if (x == 2) x = 'II';
  if (x == 3) x = 'III';
  if (x == 4) x = 'IV';
  if (x == 5) x = 'V';
  if (x == 2) x = 'VI';
  return x;
}

// Получаем данные из API с использованием URL из массива в объекте эпизода
function details(options, optionslist, wrapperoptions) {
  options.forEach(option => {
    fetch(option)
      .then(res => res.json())
      .then(data => {
        optionslist = document.createElement('span');
        optionslist.classList.add('p-2');
        optionslist.textContent = `  ${data.name} `;
        wrapperoptions.classList.add('m-2');
        wrapperoptions.append(optionslist);
      });
  });
}
