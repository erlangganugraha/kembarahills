// Year update
document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll effect
const header = document.getElementById('mainHeader');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Scroll animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-in classes
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
  observer.observe(el);
});

// Mobile menu toggle
const btn = document.getElementById('mobileMenuBtn');
const menu = document.getElementById('mobileMenu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Hero Slider
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicator');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  let currentSlide = 0;
  let autoPlayInterval;

  function animateHeroContent(slide) {
    // Reset animations first
    const content = slide.querySelector('.hero-content');
    const badge = slide.querySelector('.hero-badge');
    const title = slide.querySelector('.hero-title');
    const description = slide.querySelector('.hero-description');
    const button = slide.querySelector('.hero-button');
    
    // Remove animate class to reset
    if (content) content.classList.remove('animate');
    if (badge) badge.classList.remove('animate');
    if (title) title.classList.remove('animate');
    if (description) description.classList.remove('animate');
    if (button) button.classList.remove('animate');
    
    // Force reflow to ensure reset is applied
    if (content) void content.offsetHeight;
    
    // Trigger animations after a small delay to allow reset
    setTimeout(() => {
      if (content) content.classList.add('animate');
      if (badge) badge.classList.add('animate');
      if (title) title.classList.add('animate');
      if (description) description.classList.add('animate');
      if (button) button.classList.add('animate');
    }, 100);
  }

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
      slide.classList.remove('opacity-100', 'active');
      slide.classList.add('opacity-0');
    });
    
    // Show current slide
    slides[index].classList.remove('opacity-0');
    slides[index].classList.add('opacity-100', 'active');
    
    // Animate hero content
    animateHeroContent(slides[index]);
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.remove('bg-white/50', 'w-2');
        indicator.classList.add('bg-white', 'w-8');
      } else {
        indicator.classList.remove('bg-white', 'w-8');
        indicator.classList.add('bg-white/50', 'w-2');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(index);
      startAutoPlay();
    });
  });

  // Pause on hover
  const slider = document.getElementById('heroSlider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  }

  // Initialize - animate on page load
  function initHeroSlider() {
    showSlide(0);
    startAutoPlay();
  }
  
  // Trigger animation when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        initHeroSlider();
      }, 100);
    });
  } else {
    // DOM already loaded
    setTimeout(() => {
      initHeroSlider();
    }, 100);
  }
})();

