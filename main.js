// main.js — interactive behavior (smooth scroll, project toggles, scroll-to-top, small nav toggle)

// 1) Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) { // skip single "#" links
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// 2) Toggle project card details (click + keyboard support)
document.querySelectorAll('.project-card').forEach(card => {
  // Function to toggle the details for this card
  const toggle = () => {
    const details = card.querySelector('.project-details');
    if (!details) return;
    const isHidden = details.hasAttribute('hidden');
    if (isHidden) {
      details.removeAttribute('hidden');
      card.setAttribute('aria-pressed', 'true');
    } else {
      details.setAttribute('hidden', '');
      card.setAttribute('aria-pressed', 'false');
    }
  };

  // mouse click
  card.addEventListener('click', toggle);

  // keyboard: Enter or Space toggles too (accessibility)
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});

// 3) Back-to-top button (created dynamically)
(function setupScrollTop() {
  const btn = document.createElement('button');
  btn.id = 'scrollTopBtn';
  btn.title = 'Back to top';
  btn.textContent = '↑ Top';
  document.body.appendChild(btn);

  // show/hide when scrolling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.style.display = 'block';
    else btn.style.display = 'none';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// 4) Small nav toggle for mobile
(function smallNav() {
  const toggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    if (navList.style.display === 'flex' || navList.style.display === '') {
      navList.style.display = 'none';
    } else {
      navList.style.display = 'flex';
      navList.style.flexDirection = 'column';
      navList.style.gap = '10px';
    }
  });
})();

// 5) small convenience: set current year in footer
(function setYear(){
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if (el) el.textContent = y;
})();

// === Projects Modal Code ===

// Select modal and elements
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");
const closeBtn = document.querySelector(".close-btn");

// Project details (edit links later to your GitHub repos)
const projects = {
  nutrifit: {
    title: "NutriFit — Nutrition Tracker",
    desc: "A health and diet tracking application that helps users monitor calories and manage diet plans effectively.",
    link: "https://github.com/smuniajey/Nutri-Fit.git"
  },
  recipe: {
    title: "Recipe Manager",
    desc: "A cooking recipe management system where users can add, search, and manage recipes easily.",
    link: "https://github.com/smuniajey/Cooking-DBMS.git"
  },
  dsa: {
    title: "Image encryption tool",
    desc: "A image encyption tool to hide and protect an image.",
    link: "https://github.com/smuniajey/Image-encryption.gite"
  }
};

// When a project card is clicked
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    let projectKey = card.getAttribute("data-project");
    let project = projects[projectKey];

    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;
    modalLink.href = project.link;

    modal.style.display = "block";
  });
});

// Close modal when X is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal if clicked outside content
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
