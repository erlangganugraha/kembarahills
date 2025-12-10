import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load HTML file
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
const dom = new JSDOM(html);
const document = dom.window.document;

describe('Responsive Design Tests', () => {
  describe('Viewport Meta Tag', () => {
    it('should have viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
    });

    it('should have correct viewport content', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        const content = viewport.getAttribute('content');
        expect(content).toContain('width=device-width');
        expect(content).toContain('initial-scale=1');
      }
    });
  });

  describe('Responsive Classes', () => {
    it('should have responsive text classes (sm:, md:, lg:)', () => {
      const elements = document.querySelectorAll('*');
      let hasResponsiveClasses = false;
      
      elements.forEach(el => {
        const classList = Array.from(el.classList);
        classList.forEach(className => {
          if (className.includes('sm:') || className.includes('md:') || 
              className.includes('lg:') || className.includes('xl:')) {
            hasResponsiveClasses = true;
          }
        });
      });
      
      expect(hasResponsiveClasses).toBe(true);
    });

    it('should have responsive grid classes', () => {
      const grids = document.querySelectorAll('[class*="grid"]');
      let hasResponsiveGrid = false;
      
      grids.forEach(grid => {
        const classList = Array.from(grid.classList);
        classList.forEach(className => {
          if ((className.includes('sm:grid') || className.includes('md:grid') || 
               className.includes('lg:grid')) && className.includes('grid-cols')) {
            hasResponsiveGrid = true;
          }
        });
      });
      
      expect(hasResponsiveGrid).toBe(true);
    });

    it('should have responsive flex classes', () => {
      const flexElements = document.querySelectorAll('[class*="flex"]');
      let hasResponsiveFlex = false;
      
      flexElements.forEach(el => {
        const classList = Array.from(el.classList);
        classList.forEach(className => {
          if (className.includes('sm:flex') || className.includes('md:flex') || 
              className.includes('lg:flex')) {
            hasResponsiveFlex = true;
          }
        });
      });
      
      expect(hasResponsiveFlex).toBe(true);
    });
  });

  describe('Typography Responsiveness', () => {
    it('should have responsive text sizes', () => {
      const headings = document.querySelectorAll('h1, h2, h3');
      let hasResponsiveText = false;
      
      headings.forEach(heading => {
        const classList = Array.from(heading.classList);
        classList.forEach(className => {
          if (className.includes('sm:text-') || className.includes('md:text-') || 
              className.includes('lg:text-')) {
            hasResponsiveText = true;
          }
        });
      });
      
      expect(hasResponsiveText).toBe(true);
    });

    it('should have responsive heading sizes', () => {
      const h2Elements = document.querySelectorAll('h2');
      let hasResponsiveHeading = false;
      
      h2Elements.forEach(h2 => {
        const classList = Array.from(h2.classList);
        classList.forEach(className => {
          if (className.includes('text-3xl') && 
              (className.includes('sm:text-4xl') || className.includes('lg:text-5xl'))) {
            hasResponsiveHeading = true;
          }
        });
      });
      
      expect(hasResponsiveHeading).toBe(true);
    });
  });

  describe('Mobile Menu', () => {
    it('should have mobile menu button with responsive visibility', () => {
      const mobileBtn = document.getElementById('mobileMenuBtn');
      expect(mobileBtn).toBeTruthy();
      
      if (mobileBtn) {
        const classList = Array.from(mobileBtn.classList);
        const hasMobileOnly = classList.some(cls => cls.includes('md:hidden'));
        expect(hasMobileOnly).toBe(true);
      }
    });

    it('should have mobile menu with responsive visibility', () => {
      const mobileMenu = document.getElementById('mobileMenu');
      expect(mobileMenu).toBeTruthy();
      
      if (mobileMenu) {
        const classList = Array.from(mobileMenu.classList);
        const hasMobileOnly = classList.some(cls => cls.includes('md:hidden'));
        expect(hasMobileOnly).toBe(true);
      }
    });

    it('should have desktop navigation with responsive visibility', () => {
      const desktopNav = document.querySelector('nav.hidden.md\\:flex');
      expect(desktopNav).toBeTruthy();
    });
  });

  describe('Responsive Images', () => {
    it('should have responsive image containers', () => {
      const images = document.querySelectorAll('img');
      let hasResponsiveContainer = false;
      
      images.forEach(img => {
        const parent = img.parentElement;
        if (parent) {
          const classList = Array.from(parent.classList);
          classList.forEach(className => {
            if (className.includes('w-full') || className.includes('h-full') ||
                className.includes('object-cover')) {
              hasResponsiveContainer = true;
            }
          });
        }
      });
      
      expect(hasResponsiveContainer).toBe(true);
    });

    it('should have images with responsive sizing', () => {
      const images = document.querySelectorAll('img');
      let hasResponsiveSizing = false;
      
      images.forEach(img => {
        const classList = Array.from(img.classList);
        classList.forEach(className => {
          if (className.includes('w-full') || className.includes('h-full')) {
            hasResponsiveSizing = true;
          }
        });
      });
      
      expect(hasResponsiveSizing).toBe(true);
    });
  });

  describe('Responsive Spacing', () => {
    it('should have responsive padding classes', () => {
      const elements = document.querySelectorAll('*');
      let hasResponsivePadding = false;
      
      elements.forEach(el => {
        const classList = Array.from(el.classList);
        classList.forEach(className => {
          if ((className.includes('sm:px-') || className.includes('md:px-') || 
               className.includes('lg:px-')) ||
              (className.includes('sm:py-') || className.includes('md:py-') || 
               className.includes('lg:py-'))) {
            hasResponsivePadding = true;
          }
        });
      });
      
      expect(hasResponsivePadding).toBe(true);
    });

    it('should have responsive margin classes', () => {
      const elements = document.querySelectorAll('*');
      let hasResponsiveMargin = false;
      
      elements.forEach(el => {
        const classList = Array.from(el.classList);
        classList.forEach(className => {
          if ((className.includes('sm:mt-') || className.includes('md:mt-') || 
               className.includes('lg:mt-')) ||
              (className.includes('sm:mb-') || className.includes('md:mb-') || 
               className.includes('lg:mb-'))) {
            hasResponsiveMargin = true;
          }
        });
      });
      
      expect(hasResponsiveMargin).toBe(true);
    });
  });

  describe('Responsive Layouts', () => {
    it('should have responsive grid layouts', () => {
      const gridElements = document.querySelectorAll('[class*="grid-cols"]');
      let hasResponsiveGrid = false;
      
      gridElements.forEach(el => {
        const classList = Array.from(el.classList);
        classList.forEach(className => {
          if (className.includes('grid-cols-1') && 
              (className.includes('md:grid-cols-') || className.includes('lg:grid-cols-'))) {
            hasResponsiveGrid = true;
          }
        });
      });
      
      expect(hasResponsiveGrid).toBe(true);
    });

    it('should have responsive flex directions', () => {
      const flexElements = document.querySelectorAll('[class*="flex"]');
      let hasResponsiveFlexDir = false;
      
      flexElements.forEach(el => {
        const classList = Array.from(el.classList);
        classList.forEach(className => {
          if ((className.includes('flex-col') && className.includes('md:flex-row')) ||
              (className.includes('flex-row') && className.includes('md:flex-col'))) {
            hasResponsiveFlexDir = true;
          }
        });
      });
      
      expect(hasResponsiveFlexDir).toBe(true);
    });
  });

  describe('Hero Section Responsiveness', () => {
    it('should have responsive hero height', () => {
      const heroSlider = document.getElementById('heroSlider');
      if (heroSlider) {
        const classList = Array.from(heroSlider.classList);
        const hasResponsiveHeight = classList.some(cls => 
          cls.includes('h-[') || cls.includes('min-h-')
        );
        expect(hasResponsiveHeight).toBe(true);
      }
    });

    it('should have responsive hero content', () => {
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        const classList = Array.from(heroContent.classList);
        const hasResponsiveText = classList.some(cls => 
          cls.includes('sm:text-') || cls.includes('md:text-') || cls.includes('lg:text-')
        );
        expect(hasResponsiveText).toBe(true);
      }
    });
  });

  describe('Container Responsiveness', () => {
    it('should have responsive container classes', () => {
      const containers = document.querySelectorAll('[class*="max-w"]');
      let hasResponsiveContainer = false;
      
      containers.forEach(container => {
        const classList = Array.from(container.classList);
        classList.forEach(className => {
          if (className.includes('max-w-7xl') || className.includes('max-w-2xl') ||
              className.includes('max-w-xl')) {
            hasResponsiveContainer = true;
          }
        });
      });
      
      expect(hasResponsiveContainer).toBe(true);
    });

    it('should have responsive padding on containers', () => {
      const containers = document.querySelectorAll('[class*="px-"]');
      let hasResponsivePadding = false;
      
      containers.forEach(container => {
        const classList = Array.from(container.classList);
        classList.forEach(className => {
          if (className.includes('px-4') && 
              (className.includes('sm:px-6') || className.includes('lg:px-8'))) {
            hasResponsivePadding = true;
          }
        });
      });
      
      expect(hasResponsivePadding).toBe(true);
    });
  });

  describe('Card Responsiveness', () => {
    it('should have responsive card layouts', () => {
      const cards = document.querySelectorAll('[class*="card"]');
      let hasResponsiveCards = false;
      
      cards.forEach(card => {
        const parent = card.parentElement;
        if (parent) {
          const classList = Array.from(parent.classList);
          classList.forEach(className => {
            if (className.includes('grid-cols-1') && 
                (className.includes('md:grid-cols-') || className.includes('lg:grid-cols-'))) {
              hasResponsiveCards = true;
            }
          });
        }
      });
      
      expect(hasResponsiveCards).toBe(true);
    });
  });

  describe('Button Responsiveness', () => {
    it('should have responsive button sizes', () => {
      const buttons = document.querySelectorAll('a[class*="px-"], button[class*="px-"]');
      let hasResponsiveButtons = false;
      
      buttons.forEach(button => {
        const classList = Array.from(button.classList);
        classList.forEach(className => {
          if (className.includes('px-') && 
              (className.includes('sm:px-') || className.includes('md:px-'))) {
            hasResponsiveButtons = true;
          }
        });
      });
      
      expect(hasResponsiveButtons).toBe(true);
    });
  });

  describe('Navigation Responsiveness', () => {
    it('should have responsive navigation layout', () => {
      const nav = document.querySelector('nav');
      if (nav) {
        const classList = Array.from(nav.classList);
        const hasResponsiveNav = classList.some(cls => 
          cls.includes('hidden') && cls.includes('md:flex')
        );
        expect(hasResponsiveNav).toBe(true);
      }
    });
  });

  describe('Section Responsiveness', () => {
    it('should have responsive section padding', () => {
      const sections = document.querySelectorAll('section');
      let hasResponsivePadding = false;
      
      sections.forEach(section => {
        const classList = Array.from(section.classList);
        classList.forEach(className => {
          if (className.includes('py-') && 
              (className.includes('sm:py-') || className.includes('md:py-') || 
               className.includes('lg:py-'))) {
            hasResponsivePadding = true;
          }
        });
      });
      
      expect(hasResponsivePadding).toBe(true);
    });
  });
});



