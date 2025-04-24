// script.js

document.addEventListener('DOMContentLoaded', function () {
  const bg2Mobil = document.getElementById('bg2-mobil');
  const bg2MobilReg = document.getElementById('bg2-mobil-reg');
  const bg2Desktop = document.getElementById('bg2-desktop');

  console.log("Script geladen");
  console.log("bg2Mobil:", bg2Mobil);
  console.log("bg2MobilReg:", bg2MobilReg);
  console.log("bg2Desktop:", bg2Desktop);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const screenWidth = window.innerWidth;

    console.log("ScrollY:", scrollTop);
    console.log("Screen width:", screenWidth);

    // Mobilbereich
    if (screenWidth < 768) {
      console.log("Mobil erkannt");

      if (bg2Mobil) {
        const fadeDistance = window.innerHeight * 0.7;
        const opacity = Math.max(1 - scrollTop / fadeDistance, 0);
        console.log("bg2Mobil fadeDistance:", fadeDistance, " → opacity:", opacity);
        bg2Mobil.style.opacity = opacity.toFixed(2);
      }

      if (bg2MobilReg) {
        const fadeDistance = window.innerHeight * 0.3;
        const opacity = Math.max(1 - scrollTop / fadeDistance, 0);
        console.log("bg2MobilReg fadeDistance:", fadeDistance, " → opacity:", opacity);
        bg2MobilReg.style.opacity = opacity.toFixed(2);
      }
    }

    // Desktopbereich
    if (screenWidth >= 768 && bg2Desktop) {
      const fadeDistance = window.innerHeight * 0.7;
      const opacity = Math.max(1 - scrollTop / fadeDistance, 0);
      console.log("Desktop fadeDistance:", fadeDistance, " → opacity:", opacity);
      bg2Desktop.style.opacity = opacity.toFixed(2);
    }
  });
});


  // Konfetti (funktioniert weiterhin global)
  window.throwConfetti = function(e) {
    const rect = e.target.getBoundingClientRect();
    confetti({
      particleCount: 100,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      }
    });
  };

// Toggle
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.toggleTrigger');

  triggers.forEach(trigger => {
    const menu = trigger.nextElementSibling;
    const svg = trigger.querySelector('.toggle-svg');

    const getDefaultOpen = () => {
      const attr = trigger.getAttribute('data-default-open');
      return attr === 'true';
    };

    const getDisplayType = () => {
      return trigger.getAttribute('data-display') || 'block';
    };

    const setInitialState = () => {
      const defaultOpen = getDefaultOpen();
      const displayType = getDisplayType();
      menu.style.display = defaultOpen ? displayType : 'none';
      menu.dataset.expanded = defaultOpen.toString();
    };

    trigger.addEventListener('click', () => {
      const isExpanded = menu.dataset.expanded === 'true';
      const displayType = getDisplayType();
      menu.style.display = isExpanded ? 'none' : displayType;
      menu.dataset.expanded = (!isExpanded).toString();

      if (svg) {
        svg.src = !isExpanded ? '../b/toggle-down.svg' : '../b/toggle-up.svg';
      }
    });

    setInitialState();
  });
});

const krone = document.querySelector('#krone-bild');
const links = document.querySelectorAll('.main-nav ul li a');

links.forEach(link => {
  if (link.classList.contains('selected')) {
    const rect = link.getBoundingClientRect();
    const parentRect = document.querySelector('.main-nav').getBoundingClientRect();
    krone.style.left = `${rect.left - parentRect.left}px`;
  }
});
