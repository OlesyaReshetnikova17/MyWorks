
let tl = gsap.timeline();

tl.from('.hero__title', {opacity: 0, y:  100, duration: 0.5})
  .from('.hero__btn', {opacity: 0, y:  100, duration: 0.5}, "-=0.5")
  .from('.hero__descr', {opacity: 0, duration: 0.7})
  .from(".item-1", {
    scale: 0,
    opacity: 0,
  },
  {
    scale: 1,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
  },
  3,
  )
  .from(".item-2", {
    scale: 0,
    opacity: 0,
  },
  {
    scale: 1,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
  },
  3,
  )
  .from(".item-3", {
    scale: 0,
    opacity: 0,
  },
  {
    scale: 1,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
  },
  3,
  )
  .from('.photos__author', {opacity: 0, duration: 0.7});



//функция смены дисплей none-block
let menu = document.querySelector('.menu');
let btn = document.querySelector('.burger');
let close = document.querySelector('.close');
let menuTimeline = gsap.timeline({ paused: true });




menuTimeline.from(".menu", { display: "none" }).to(".menu", { display: "block", opacity: 1, duration: 1 })
            .from('.menu', {opacity: 0}, { duration: 1, opasity: 1 })
            .from('.nav__item', { opacity: 0, stagger: 0.2, duration: 0.5 });

btn.onclick = function () {menuTimeline.play();};
close.onclick = function () {menuTimeline.reverse();};
