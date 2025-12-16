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

  /*Ser till att CSS-storleken matchar för att undvika visuellt överflöd*/
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
console.log(`Title: ${title}, Message: ${message}`);

if (title || message) {
  const titleElement = document.querySelector("#title");
  if (titleElement) titleElement.textContent = title;
  const messageElement = document.querySelector("#message");
  if (messageElement) messageElement.textContent = message;
}

/*Detta Auto playar jul musiken */
window.addEventListener("click", () => {
  const audio = document.getElementById("christmasMusic");
  if (audio && audio.paused) {
    audio.play().catch(err => console.log("Audio play failed:", err));
  }
});

/*Denna försöker spela musiken när hemsidan har laddats */
window.addEventListener("load", () => {
  const audio = document.getElementById("christmasMusic");
  if (audio) {
    audio.play().catch(err => console.log("Audio autoplay blocked by browser"));
  }
});

/* fixar tap/touch för de devices som inte har hover */
/*Denna del tog jag hjälp av en guide*/
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function (e) {

      /*växlar inte när du klickar på länkar inuti kortet*/
      if (e.target && e.target.tagName && e.target.tagName.toLowerCase() === 'a') return;
      card.classList.toggle('flipped');
    });
  });
});