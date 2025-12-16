const bgImage = new Image();
bgImage.src = 'beautiful-sky.jpg';

function drawBackground() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground();
}

window.addEventListener('resize', resize);
resize();

const scale = Math.max(canvas.width / bgImage.width, canvas.height / bgImage.height);
const x = (canvas.width / 2) - (bgImage.width / 2) * scale;
const y = (canvas.height / 2) - (bgImage.height / 2) * scale;
ctx.drawImage(bgImage, x, y, bgImage.width * scale, bgImage.height * scale);

