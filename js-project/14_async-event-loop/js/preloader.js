export function preloader() {
  const wrapper = document.createElement("div");
  const spinner = document.createElement("div");
  const dot1 = document.createElement("div");
  const dot2 = document.createElement("div");

  wrapper.classList.add('wrapper')
  spinner.classList.add('spinner');
  dot1.classList.add('dot1');
  dot2.classList.add('dot2');

  spinner.append(dot1, dot2);
  wrapper.append(spinner);

  return wrapper;
}
