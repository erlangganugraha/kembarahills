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

// Why Choose Kembara Hills Slider
(function() {
  const slider = document.querySelector('.why-choose-slider');
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.why-slide');
  const dots = slider.querySelectorAll('.why-dot');
  const valuePoints = document.querySelectorAll('.value-point');
  let currentSlide = 0;
  let autoPlayInterval;
  
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
      slide.classList.remove('opacity-100');
      slide.classList.add('opacity-0');
    });
    
    // Show current slide
    slides[index].classList.remove('opacity-0');
    slides[index].classList.add('opacity-100');
    
    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove('bg-white/50', 'w-2');
        dot.classList.add('bg-white', 'w-8');
      } else {
        dot.classList.remove('bg-white', 'w-8');
        dot.classList.add('bg-white/50', 'w-2');
      }
    });
    
    // Highlight corresponding value point
    valuePoints.forEach((point, i) => {
      if (i === index) {
        point.classList.add('active');
        point.style.opacity = '1';
        point.style.transform = 'translateX(8px)';
      } else {
        point.classList.remove('active');
        point.style.opacity = '0.7';
        point.style.transform = 'translateX(0)';
      }
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Click on dots to go to specific slide
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      stopAutoPlay();
      currentSlide = index;
      showSlide(currentSlide);
      startAutoPlay();
    });
  });
  
  // Click on value points to go to corresponding slide
  valuePoints.forEach((point, index) => {
    point.addEventListener('click', () => {
      stopAutoPlay();
      currentSlide = index;
      showSlide(currentSlide);
      startAutoPlay();
    });
    
    point.style.cursor = 'pointer';
    point.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
  
  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);
  
  // Initialize
  showSlide(0);
  startAutoPlay();
})();

// FAQ Accordion
(function() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const icon = question.querySelector('.faq-icon');
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items
      faqQuestions.forEach(q => {
        if (q !== question) {
          const item = q.closest('.faq-item');
          const ans = item.querySelector('.faq-answer');
          const ic = q.querySelector('.faq-icon');
          ans.classList.add('hidden');
          q.setAttribute('aria-expanded', 'false');
          ic.classList.remove('rotate-180');
        }
      });
      
      // Toggle current item
      if (isExpanded) {
        answer.classList.add('hidden');
        question.setAttribute('aria-expanded', 'false');
        icon.classList.remove('rotate-180');
      } else {
        answer.classList.remove('hidden');
        question.setAttribute('aria-expanded', 'true');
        icon.classList.add('rotate-180');
      }
    });
  });
})();

// Pricing Slider
(function() {
  const slides = document.querySelectorAll('.pricing-slide');
  const dots = document.querySelectorAll('.pricing-dot');
  const prevBtn = document.getElementById('pricingPrevBtn');
  const nextBtn = document.getElementById('pricingNextBtn');
  let currentSlide = 0;
  let autoPlayInterval;

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
      slide.classList.remove('opacity-100', 'active');
      slide.classList.add('opacity-0');
    });
    
    // Show current slide
    slides[index].classList.remove('opacity-0');
    slides[index].classList.add('opacity-100', 'active');
    
    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove('bg-white/40');
        dot.classList.add('bg-white/80');
      } else {
        dot.classList.remove('bg-white/80');
        dot.classList.add('bg-white/40');
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
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      goToSlide(index);
      startAutoPlay();
    });
  });

  // Pause on hover
  const slider = document.getElementById('pricingSlider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  }

  // Initialize
  function initPricingSlider() {
    if (slides.length > 0) {
      showSlide(0);
      startAutoPlay();
    }
  }
  
  // Trigger when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        initPricingSlider();
      }, 100);
    });
  } else {
    setTimeout(() => {
      initPricingSlider();
    }, 100);
  }
})();


