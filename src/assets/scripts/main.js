/**
 * Import dependencies from node_modules
 * see commented examples below
 */
import { ScrollTrigger, gsap , Power1 } from "gsap/all";
import SmoothScroll from 'smooth-scroll';

gsap.registerPlugin(ScrollTrigger);
var scroll = new SmoothScroll('a[href*="#"]');

/**
 * Ramen
 */
ScrollTrigger.create({
  trigger: '#qualifications',
  start: 'top top',
  end: 'bottom',
  pin: true
});

gsap.to('.ramen', {
  scrollTrigger: {
    trigger: '#qualifications',
    start: 'top',
    end: 'bottom',
    scrub: 1,
    toggleActions: 'restart pause reverse pause'
  },
  x: 200,
  rotation: 360,
  ease: Power1.easeInOut,
  duration: 3,
})

/**
 * Sushi
 */
 ScrollTrigger.create({
  trigger: '#work',
  start: 'top top',
  end: 'bottom',
  pin: true
});

gsap.to('.sushi', {
  scrollTrigger: {
    trigger: '#work',
    start: 'top',
    end: 'bottom',
    scrub: 2,
    toggleActions: 'restart pause reverse pause'
  },
  y: -200,
  x: 400,
  ease: Power1.easeOut,
  duration: 1.5,
})

/**
 * Rice
 */
 ScrollTrigger.create({
  trigger: '#contact',
  start: 'top top',
  end: 'bottom',
  pin: true
});

gsap.to('.rice', {
  scrollTrigger: {
    trigger: '#contact',
    start: 'top',
    end: 'bottom',
    scrub: 2,
    toggleActions: 'restart pause reverse pause'
  },
  x: 400,
  y: 200,
  rotation: -60,
  ease: Power1.easeIn,
  duration: 1.5,
})



let emojiInterval;

(function init() {
  if (window.innerWidth > 700) populateEmojisForSectionOne();
  gsap.fromTo(".portfolio__nav--underline", {y: 50, ease: 'easeOut'}, {y: 0, duration: 1, delay: .2, ease: 'easeOut' });
})();


function populateEmojisForSectionOne() {
  const sectionOne = document.querySelector('.portfolio__wrapper');
  const childEls = [];
  const availableEmojis = [];
  const shapes = ['🍥', '🍣', '🥡', '🍜', '🍙', '🍚', '🥢', '🍶']


  for (let x=0; x < window.innerWidth  / 2 ; x++) {
    let positionEl = {
      x: (Math.random() * window.innerWidth) - 100,
      y: (Math.random() * window.innerHeight)
    }

    if (
    !(positionEl.x > 60 && positionEl.x < (window.innerWidth - 55)) ||
     (positionEl.y > window.innerHeight - 95)
    )
    {
      const divEl = document.createElement('div');
      const divElCont = document.createTextNode(shapes[Math.floor(Math.random() * shapes.length) ]);
      divEl.style.fontSize = '8rem';
      divEl.style.position = 'absolute';

      divEl.classList.add('emoji');
      divEl.classList.add(`emoji-${x}`);
      availableEmojis.push(`.emoji-${x}`);

      divEl.style.opacity = '0.8';
      divEl.style.position = 'fixed';
      divEl.style.transition = 'all 1.8s .05s cubic-bezier(0.19, 1, 0.22, 1)';

      divEl.appendChild(divElCont);

      divEl.style.left = `${positionEl.x}px`;
      divEl.style.top =`${positionEl.y}px`;

      childEls.push(divEl);
    }
  }

  sectionOne.append(...childEls)


  let i = 0;
  emojiInterval = setInterval(() => {
    const e = document.querySelector(availableEmojis[i]);
    if (e) {
      let left = Number(e.style.left.replace('px', ''));
      let top = Number(e.style.top.replace('px', ''));

      if (left < window.innerWidth / 2 && top < window.innerHeight / 2) {
        e.classList.add('animate-emoji-right-bottom');
      } else if (left > window.innerWidth / 2 && top < window.innerHeight / 2) {
        e.classList.add('animate-emoji-left-bottom');
      } else if (left < window.innerWidth / 2 && top > window.innerHeight / 2) {
        e.classList.add('animate-emoji-right-top');
      } else {
        e.classList.add('animate-emoji-left-top');
      }
      i++;
    }
  }, 600);
}

window.addEventListener('resize', () => {
  (document.querySelectorAll('.emoji')).forEach(e => e.remove());
  clearInterval(emojiInterval);
  if (window.innerWidth > 700) populateEmojisForSectionOne();
})


const sectionOne = document.querySelector('#about');
const emojis = document.querySelectorAll('.emoji');
sectionOne.addEventListener('mousemove', (e) => {
  animateEmojis(e.clientX, e.clientY);
});
function animateEmojis(mouseX, mouseY) {
  if (mouseX > window.innerWidth / 2) {
    emojis.forEach(e => e.style.transform = `translateX(${16 * Math.random()}px)`);
  } else {
    emojis.forEach(e => e.style.transform = `translateX(${-16 * Math.random()}px)`);
  }

  if (mouseY > window.innerHeight / 2) {
    emojis.forEach(e => e.style.transform += `translateY(${16 * Math.random()}px)`);
  } else {
    emojis.forEach(e => e.style.transform += `translateY(${-16 * Math.random()}px)`);
  }
}








