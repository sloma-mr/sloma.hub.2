// ============================================
// PORTFOLIO CASE MANAGEMENT
// ============================================
const demoButton = document.getElementById('demoButton');
const portfolioButtons = document.querySelectorAll('[data-case]');
const caseTitle = document.getElementById('caseTitle');
const caseDescription = document.getElementById('caseDescription');
const portfolioImage = document.getElementById('portfolioImage')?.querySelector('img');

const cases = {
  case1: {
    title: 'Elegant brand launch',
    description: 'A sleek professional website designed to introduce a new service, build credibility, and attract the first clients.',
    image: 'https://images.unsplash.com/photo-1505682634904-d7c4b1f3c44a?auto=format&fit=crop&w=900&q=80',
  },
  case2: {
    title: 'Fast conversion landing page',
    description: 'A high-impact landing page created to capture leads, communicate value quickly, and turn visitors into inquiries.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  },
  case3: {
    title: 'Modern portfolio showcase',
    description: 'A polished project gallery built to highlight your best work, tell your story, and win more clients.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
  },
};

// ============================================
// CASE SWITCHING WITH ANIMATIONS
// ============================================
function setCase(key) {
  const selected = cases[key];
  if (!selected || !portfolioImage) return;

  // Animate title change
  gsap.to(caseTitle, {
    opacity: 0,
    y: -10,
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      caseTitle.textContent = selected.title;
      gsap.to(caseTitle, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out',
      });
    },
  });

  // Animate description change
  gsap.to(caseDescription, {
    opacity: 0,
    y: -10,
    duration: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      caseDescription.textContent = selected.description;
      gsap.to(caseDescription, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out',
      });
    },
  });

  // Animate image with zoom effect
  gsap.timeline()
    .to(portfolioImage, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        portfolioImage.src = selected.image;
      },
    })
    .to(portfolioImage, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out',
    }, '<0.1');

  // Update button states
  portfolioButtons.forEach((button) => {
    const isActive = button.dataset.case === key;
    
    gsap.to(button, {
      backgroundColor: isActive ? '#0f172a' : 'rgba(15, 23, 42, 0.9)',
      borderColor: isActive ? '#38bdf8' : 'rgba(148, 163, 184, 0.18)',
      duration: 0.3,
      ease: 'power2.out',
    });

    button.classList.toggle('active', isActive);
  });
}

// ============================================
// DEMO BUTTON - Random Case Selection
// ============================================
if (demoButton) {
  demoButton.addEventListener('click', () => {
    // Add click animation
    gsap.to(demoButton, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
    });

    // Trigger random case
    const randomKeys = Object.keys(cases);
    const randomKey = randomKeys[Math.floor(Math.random() * randomKeys.length)];
    setCase(randomKey);

    // Scroll to portfolio section
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      lenis.scrollTo(portfolioSection, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
}

// ============================================
// PORTFOLIO BUTTON INTERACTIONS
// ============================================
portfolioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setCase(button.dataset.case);

    // Button press animation
    gsap.to(button, {
      scale: 0.98,
      duration: 0.15,
      ease: 'back.out',
      yoyo: true,
      repeat: 1,
    });
  });

  // Hover animation
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale: 1.05,
      duration: 0.3,
      ease: 'back.out',
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      duration: 0.3,
      ease: 'back.out',
    });
  });
});

// ============================================
// INITIAL CASE SETUP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  setCase('case1');
});

