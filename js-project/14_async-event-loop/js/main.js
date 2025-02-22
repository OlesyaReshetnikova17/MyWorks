import { preloader } from './preloader.js';

const cssPromises = {};

function loadResource(src) {
  // JavaScript module
  if (src.endsWith('.js')) {
    return import(src);
  }

  // CSS файл
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }

  // Данные сервера
  return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);
const film = searchParams.get('film');


export function renderPage(moduleName, apiUrl, css, normalize) {
  appContainer.style.backgroundImage = '';
  appContainer.style.height = '0';
  appContainer.innerHTML = '';
  const loader = preloader();
  document.body.appendChild(loader);

  Promise.all([moduleName, apiUrl, css, normalize].map((src) => loadResource(src))).then(
    ([pageModule, data]) => {
      document.body.removeChild(loader);
      appContainer.innerHTML = '';
      appContainer.append(pageModule.render(data));
    }
  );
}

if (film) {
  renderPage(
    '../js/film-page.js',
    `https://swapi.dev/api/films/${film}`,
    'https://necolas.github.io/normalize.css/8.0.1/normalize.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
  );
} else {
  renderPage(
    '../js/film-list.js',
    `https://swapi.dev/api/films`,
    'https://necolas.github.io/normalize.css/8.0.1/normalize.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'
  );
}
