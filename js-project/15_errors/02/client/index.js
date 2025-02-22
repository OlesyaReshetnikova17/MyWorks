
async function getData() {
  const spinner = document.querySelector('spinner-border');
  window.addEventListener('offline', (e) => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.style.fontSize = '30px';
    div.classList.add('d-flex', 'justify-content-end', 'text-bg-danger', 'py-4');
    p.textContent = 'Произошла ошибка ,нет подключения';
    div.append(p);
    document.body.append(div);
  });

  window.addEventListener('online', (e) => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.style.fontSize = '30px';
    div.classList.add('d-flex', 'justify-content-end', 'text-bg-danger', 'py-4');
    p.textContent = 'Произошла ошибка ,нет подключения';
    div.append(p);
    document.body.append(div);
  });

  try{


  const responce = await fetch('http://localhost:3000/api/products');
  const data = await responce.json();
  console.log(data);

  if (responce.status === 200 || responce.status === 201) {
    const texts = document.createElement('p');
    texts.style.fontSize = '30px';
    texts.classList.add('d-flex', 'justify-content-center', 'text-bg-danger', 'py-4');
    texts.textContent = 'Успешная обработка данных!';
    document.body.append(texts);
    return data;
  }

  if (responce.status === 404) {
    const titles = document.createElement('h2');
    titles.classList.add('d-flex', 'justify-content-center', 'text-bg-danger', 'py-4');
    titles.textContent = 'Список товаров пуст!';
    document.body.append(titles);
    addMessage();
  }

  if (responce.status === 500) {
    const texts = document.createElement('p');
    texts.style.fontSize = '30px';
    texts.classList.add('d-flex', 'justify-content-center', 'text-bg-danger', 'py-4');
    texts.textContent = 'Произошла ошибка,попробуйте обновить страницу позже!';
    document.body.append(texts);
    addMessage();
  }

}

catch(error) {
  if (error.name === "SyntaxError") {
    const block = document.createElement('div');
    const span = document.createElement('span');

    block.classList.add('d-flex', 'justify-content-center', 'text-bg-danger', 'py-4');
    span.style.fontSize = '30px';
    span.style.background = 'red';
    span.textContent = (`${error.message}: "Произошла ошибка, невалидный JSON"`);

    block.append(span);
    document.body.append(block);
    addMessage();
  }
}
  finally {
if (spinner) spinner.remove();
  }
}

async function addMessage(mesTitle, mesText)  {
  const divMes = document.createElement('div');
  mesTitle = document.createElement('h2');
  mesText = document.createElement('p');
  mesTitle.textContent = 'Оповещение пользователя';
  mesText.textContent = 'В приложении произошла ошибка';
}
async function renderApp() {
const products =  await getData();
console.log(products);

  const container = document.getElementById('add')
  container.classList.add(
    'container',
    'd-flex',
    'justify-content-between',
    'flex-wrap',
    'py-4'
  );
  for (const product of products.products) {

    const productCard = document.createElement('div');
    const image = document.createElement('img');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');
    const price = document.createElement('p');

    productCard.style.width = '18%';
    productCard.classList.add('card', 'my-2');
    image.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    title.classList.add('card-title');
    price.classList.add('card-title');

    productCard.append(image);
    productCard.append(cardBody);
    cardBody.append(title);
    cardBody.append(price);

    image.src = `${product.image}`;
    image.alt = product.name;
    title.textContent = product.name;
    price.textContent = product.price;

    container.append(productCard);
  }
  return container;
}
 renderApp();
