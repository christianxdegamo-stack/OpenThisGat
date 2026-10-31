document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Automatic Background Audio Control ---
  const bgAudio = document.getElementById('bgAudio');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');

  function startAudio() {
    if (bgAudio && bgAudio.paused) {
      bgAudio.play().then(() => {
        musicToggle.classList.add('playing');
        if (musicIcon) {
          musicIcon.classList.remove('fa-music');
          musicIcon.classList.add('fa-pause');
        }
      }).catch(() => {
        // Autoplay prevented by browser, waiting for interaction
      });
    }
  }

  startAudio();

  document.addEventListener('click', () => {
    startAudio();
  }, { once: true });

  if (musicToggle && bgAudio) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (bgAudio.paused) {
        bgAudio.play();
        musicToggle.classList.add('playing');
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-pause');
      } else {
        bgAudio.pause();
        musicToggle.classList.remove('playing');
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-music');
      }
    });
  }

  // --- 2. Floating Hearts and Flowers Effect Generator ---
  const floatingContainer = document.getElementById('floatingContainer');
  const floatingItems = ['🌸', '💖', '🌷', '✨', '🎀', '🌸', '💕'];

  function createFloatingItem() {
    if (!floatingContainer) return;
    const item = document.createElement('div');
    item.classList.add('floating-item');

    item.innerText = floatingItems[Math.floor(Math.random() * floatingItems.length)];
    item.style.left = Math.random() * 100 + 'vw';
    item.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';

    const duration = Math.random() * 5 + 6;
    item.style.animationDuration = duration + 's';

    floatingContainer.appendChild(item);

    setTimeout(() => {
      item.remove();
    }, duration * 1000);
  }

  setInterval(createFloatingItem, 600);


  // --- 3. Smooth Scroll & Intersection Observer Transitions ---
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();


  // --- 4. Photo Memories Upload Handler ---
  const photoUpload = document.getElementById('photoUpload');
  const memoriesGrid = document.getElementById('memoriesGrid');

  if (photoUpload && memoriesGrid) {
    photoUpload.addEventListener('change', (e) => {
      const files = e.target.files;
      if (!files.length) return;

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const polaroid = document.createElement('div');
          polaroid.classList.add('polaroid');

          polaroid.innerHTML = `
            <div class="photo-frame">
              <img src="${event.target.result}" alt="Angela's Memory" />
            </div>
            <p class="caption">Bestie Memory 💕</p>
          `;

          memoriesGrid.prepend(polaroid);
        };
        reader.readAsDataURL(file);
      });
    });
  }


  // --- 5. December 4 Countdown Logic ---
  function updateCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let targetDate = new Date(`December 4, ${currentYear} 00:00:00`);

    if (now > targetDate && now.getDate() !== 4 && now.getMonth() !== 11) {
      targetDate = new Date(`December 4, ${currentYear + 1} 00:00:00`);
    }

    const isTodayBirthday = (now.getMonth() === 11 && now.getDate() === 4);

    if (isTodayBirthday) {
      document.getElementById('countdown').classList.add('hidden');
      document.getElementById('celebrationMessage').classList.remove('hidden');
      return;
    }

    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();


  // --- 6. Secret Message Reveal & Confetti Cannon (FIXED FUNCTIONALITY) ---
  const revealBtn = document.getElementById('revealBtn');
  const secretMessage = document.getElementById('secretMessage');
  const giftIcon = document.getElementById('giftIcon');

  if (revealBtn && secretMessage) {
    revealBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      const isHidden = secretMessage.classList.contains('hidden');

      if (isHidden) {
        secretMessage.classList.remove('hidden');
        revealBtn.innerText = 'Hide Message 💌';
        if (giftIcon) giftIcon.classList.add('opened');
        triggerConfetti();
      } else {
        secretMessage.classList.add('hidden');
        revealBtn.innerText = 'Tap to Reveal 💌';
        if (giftIcon) giftIcon.classList.remove('opened');
      }
    });
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#ffb3c6', '#fb6f92', '#ffe5ec', '#ff8fab']
      });
    }
  }
});