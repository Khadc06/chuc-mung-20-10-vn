/* =========================================================
   File này chỉ lo HIỆU ỨNG (dây đèn, hiện ảnh, gõ chữ, nhạc).
   Mọi chữ, ảnh, nhạc, tốc độ đều đọc từ index.html — sửa ở đó.
   ========================================================= */
document.documentElement.classList.add('js');
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const rand = (a, b) => Math.random() * (b - a) + a;

// Bóng đèn: đặt dọc theo đường dây (đường cong 4 nhịp, viewBox 400x44).
$$('.wire').forEach((w) => {
  const n = Number(w.dataset.bulbs) || 9;
  for (let k = 0; k < n; k++) {
    const x = (k + 0.5) * 400 / n, u = (x % 100) / 100;
    const b = document.createElement('i');
    b.style.left = `${x / 4}%`;
    b.style.top = `${6 + 64 * u * (1 - u)}px`;
    b.style.transitionDelay = `${k * 110}ms`;
    w.appendChild(b);
  }
});
for (let i = 0; i < 16; i++) {
  const f = document.createElement('span');
  f.style.left = `${rand(2, 98)}%`; f.style.top = `${rand(5, 95)}%`;
  f.style.animationDelay = `${rand(-9, 0)}s`; f.style.animationDuration = `${rand(7, 12)}s`;
  $('#fireflies').appendChild(f);
}

// Đèn sáng và ảnh hiện dần khi cuộn tới.
function watch(selector, onSee, threshold) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { onSee(e.target); io.unobserve(e.target); }
  }), { threshold });
  $$(selector).forEach((el) => io.observe(el));
}
watch('.wire:not([data-wait])', (el) => el.classList.add('lit'), 0.6);
watch('.moment', (el) => el.classList.add('seen'), 0.25);

// Lời chúc: đọc từ #message-source trong HTML (mỗi <p> là một đoạn, <br> là xuống dòng).
const typed = $('#typed-message'), signature = $('#signature');
const speed = Number(typed.dataset.speed) || 42;
function readMessage() {
  return $$('#message-source p').map((p) => {
    const c = p.cloneNode(true);
    c.querySelectorAll('br').forEach((br) => br.replaceWith('\u0001'));
    return c.textContent.replace(/\s+/g, ' ').split('\u0001').map((l) => l.trim()).join('\n').trim();
  }).filter(Boolean).join('\n\n');
}
function typeMessage() {
  const text = readMessage();
  typed.textContent = text;
  typed.style.minHeight = `${typed.offsetHeight}px`;
  typed.textContent = '';
  let i = 0;
  (function next() {
    if (i < text.length) {
      typed.textContent += text.charAt(i++);
      setTimeout(next, speed + (text.charAt(i - 1) === '\n' ? 150 : 0));
    } else signature.classList.add('visible');
  })();
}
watch('#finale .typed', typeMessage, 0.9);

// Nhạc: nguồn, âm lượng và chữ trên nút đều lấy từ HTML.
const audio = $('#background-music'), toggle = $('#music-toggle'), label = $('#music-label');
const labelOff = toggle.dataset.labelOff || label.textContent;
const labelOn = toggle.dataset.labelOn || labelOff;
label.textContent = labelOff;
const vol = parseFloat(audio.dataset.volume);
audio.volume = Number.isNaN(vol) ? 0.48 : Math.min(1, Math.max(0, vol));
let playing = false;
const setMusic = (on) => { playing = on; label.textContent = on ? labelOn : labelOff; toggle.setAttribute('aria-pressed', String(on)); };
async function startMusic() { try { await audio.play(); setMusic(true); } catch (e) { setMusic(false); } }
toggle.addEventListener('click', () => { if (playing) { audio.pause(); setMusic(false); } else startMusic(); });

$('#open-lights').addEventListener('click', () => {
  startMusic();
  $('.hero .wire').classList.add('lit');
  setTimeout(() => $('#m1').scrollIntoView({ behavior: 'smooth' }), 1300);
});
