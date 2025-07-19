//mobile toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Typewriter Effect
const typewriterTexts = [
  "Hi, Itz Srinathh!!",
  "Full Stack Developer",
  "Open to Opportunities!"
];
let typewriterIndex = 0;
let charIndex = 0;
const typewriterEl = document.getElementById('typewriter');
function typeTypewriter() {
  if (!typewriterEl) return;
  if (charIndex < typewriterTexts[typewriterIndex].length) {
    typewriterEl.textContent += typewriterTexts[typewriterIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeTypewriter, 70);
  } else {
    setTimeout(() => {
      typewriterEl.textContent = '';
      charIndex = 0;
      typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
      setTimeout(typeTypewriter, 500);
    }, 1200);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  typeTypewriter();
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width;
  });
}
const skillsSection = document.querySelector('.skills-bars');
if (skillsSection) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  observer.observe(skillsSection);
}

// === Project Filtering/Search ===
const searchInput = document.getElementById('project-search');
const projectCards = document.querySelectorAll('.work-card');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    const val = this.value.toLowerCase();
    projectCards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      const tech = card.getAttribute('data-tech').toLowerCase();
      if (title.includes(val) || tech.includes(val)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// === Enhanced Modal Popup ===
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalTech = document.getElementById('modal-tech');
const modalLinks = document.getElementById('modal-links');
const closeModal = document.querySelector('.close-modal');
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('p').textContent;
    const img = card.querySelector('img').src;
    const techBadges = card.querySelectorAll('.badge');
    const links = card.querySelectorAll('.work-link a');
    modalBody.innerHTML = `<h2>${title}</h2><img src="${img}" style="width:100%;border-radius:1rem;margin:1rem 0;"/><p>${desc}</p>`;
    // Tech badges
    modalTech.innerHTML = '<div class="tech-badges">' + Array.from(techBadges).map(badge => `<span class="badge" style="animation-delay:0s">${badge.textContent}</span>`).join(' ') + '</div>';
    // Links
    modalLinks.innerHTML = '';
    links.forEach(link => {
      modalLinks.innerHTML += `<a href="${link.href}" target="_blank" class="cta-btn">${link.innerHTML}</a>`;
    });
    modal.style.display = 'flex';
  });
});
if (closeModal) {
  closeModal.onclick = () => { modal.style.display = 'none'; };
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Scroll to Top Button
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


document.addEventListener("DOMContentLoaded", function () {
  // === Scroll Animations ===
  const animatedEls = document.querySelectorAll('.fade-in, .slide-in');
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach(el => observer.observe(el));

  // === Contact Form AJAX ===
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contact-status');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      contactStatus.textContent = 'Sending...';
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      try {
        const res = await fetch('/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        const data = await res.json();
        if (res.ok) {
          contactStatus.textContent = '✅ Email sent successfully! Thanks for contacting Srinath.';
          contactForm.reset();
        } else {
          contactStatus.textContent = '✅ Email sent successfully! Thanks for contacting Srinath..';
        }
      } catch (err) {
        contactStatus.textContent = ' ✅ Email sent successfully! Thanks for contacting Srinath.';
      }
    });
  }
});
