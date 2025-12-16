/* Om du vill ändra snöfärgen */
const color = [255, 255, 255];
/* justera hur snabbt snön faller */
const speed = 10;

/* Ändra här nedanför på egen risk */

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "bg");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const pi2 = 2 * Math.PI;

const bodyElement = document.querySelector("body");
bodyElement.appendChild(canvas);

let particles = [];

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
};

window.onscroll = () => {
  canvas.setAttribute("style", `top: ${window.scrollY}px`);
};

const spawnParticles = (amount) => {
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(randomInt(0, canvas.width), 0, color));
  }
};

const step = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.draw();
    particle.update();
  });

  particles = particles.filter((particle) => !particle.toDelete);

  if (particles.length < 400) {
    spawnParticles(3);
  }

  window.requestAnimationFrame(step);
};

window.requestAnimationFrame(step);

/* Ladda in text från URL-parametrar */
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const message = params.get('message');
  return { title, message };
};

const { title, message } = getQueryParams();

if (title || message) {
  const titleElement = document.querySelector("#title");
  if (titleElement) titleElement.textContent = title;

  const messageElement = document.querySelector("#message");
  if (messageElement) messageElement.textContent = message;
}


/* 🎵 STARTA MUSIK VID FÖRSTA KLICK */


const christmasMusic = document.getElementById("christmasMusic");

function startMusic() {
  if (christmasMusic && christmasMusic.paused) {
    christmasMusic.play()
      .then(() => {
        document.removeEventListener("click", startMusic);
      })
      .catch(err => console.log("Audio play blocked:", err));
  }
}

document.addEventListener("click", startMusic);


/* fixar tap/touch för devices utan hover */


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function (e) {
      if (
        e.target &&
        e.target.tagName &&
        e.target.tagName.toLowerCase() === 'a'
      ) return;

      card.classList.toggle('flipped');
    });
  });
});
