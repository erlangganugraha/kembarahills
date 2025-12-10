import { describe, it, expect } from 'vitest';
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

describe('HTML Structure Tests', () => {
  describe('Basic Structure', () => {
    it('should have a valid HTML structure', () => {
      expect(document.documentElement.tagName).toBe('HTML');
      expect(document.head).toBeTruthy();
      expect(document.body).toBeTruthy();
    });

    it('should have proper language attribute', () => {
      const htmlElement = document.documentElement;
      expect(htmlElement.getAttribute('lang')).toBeTruthy();
    });
  });

  describe('Meta Tags', () => {
    it('should have title tag', () => {
      const title = document.querySelector('title');
      expect(title).toBeTruthy();
      expect(title.textContent.length).toBeGreaterThan(0);
    });

    it('should have meta description', () => {
      const description = document.querySelector('meta[name="description"]');
      expect(description).toBeTruthy();
      expect(description.getAttribute('content')).toBeTruthy();
    });

    it('should have meta keywords', () => {
      const keywords = document.querySelector('meta[name="keywords"]');
      expect(keywords).toBeTruthy();
    });

    it('should have Open Graph tags', () => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogImage).toBeTruthy();
    });

    it('should have Twitter Card tags', () => {
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      expect(twitterCard).toBeTruthy();
      expect(twitterTitle).toBeTruthy();
    });

    it('should have canonical URL', () => {
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical).toBeTruthy();
    });
  });

  describe('Structured Data', () => {
    it('should have JSON-LD structured data', () => {
      const structuredData = document.querySelector('script[type="application/ld+json"]');
      expect(structuredData).toBeTruthy();
      
      if (structuredData) {
        const data = JSON.parse(structuredData.textContent);
        expect(data['@context']).toBe('https://schema.org');
        expect(data['@type']).toBeTruthy();
      }
    });
  });

  describe('Semantic HTML', () => {
    it('should have header element', () => {
      const header = document.querySelector('header');
      expect(header).toBeTruthy();
    });

    it('should have main element', () => {
      const main = document.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('should have footer element', () => {
      const footer = document.querySelector('footer');
      expect(footer).toBeTruthy();
    });

    it('should have proper heading hierarchy', () => {
      const h1 = document.querySelector('h1');
      const h2s = document.querySelectorAll('h2');
      expect(h1).toBeTruthy();
      expect(h2s.length).toBeGreaterThan(0);
    });
  });

  describe('Images', () => {
    it('should have images with alt text', () => {
      const images = document.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
      
      images.forEach(img => {
        expect(img.hasAttribute('alt')).toBe(true);
        const alt = img.getAttribute('alt');
        expect(alt).not.toBe('');
        expect(alt.length).toBeGreaterThan(0);
      });
    });

    it('should have loading attributes on images', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const loading = img.getAttribute('loading');
        if (loading) {
          expect(['lazy', 'eager']).toContain(loading);
        }
      });
    });
  });

  describe('Links', () => {
    it('should have internal anchor links', () => {
      const internalLinks = document.querySelectorAll('a[href^="#"]');
      expect(internalLinks.length).toBeGreaterThan(0);
    });

    it('should have external links with proper attributes', () => {
      const externalLinks = document.querySelectorAll('a[href^="http"]');
      externalLinks.forEach(link => {
        const target = link.getAttribute('target');
        const rel = link.getAttribute('rel');
        if (target === '_blank') {
          expect(rel).toContain('noopener');
        }
      });
    });

    it('should have working internal links (targets exist)', () => {
      const internalLinks = document.querySelectorAll('a[href^="#"]');
      internalLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          expect(target).toBeTruthy();
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have aria labels on interactive elements', () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        const ariaLabel = button.getAttribute('aria-label');
        const textContent = button.textContent.trim();
        // Button should have either aria-label or text content
        expect(ariaLabel || textContent).toBeTruthy();
      });
    });

    it('should have proper form labels if forms exist', () => {
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
      inputs.forEach(input => {
        const id = input.getAttribute('id');
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          const ariaLabel = input.getAttribute('aria-label');
          expect(label || ariaLabel).toBeTruthy();
        }
      });
    });
  });

  describe('CSS and JavaScript', () => {
    it('should link to styles.css', () => {
      const cssLink = document.querySelector('link[href="styles.css"]');
      expect(cssLink).toBeTruthy();
    });

    it('should link to script.js', () => {
      const scriptLink = document.querySelector('script[src="script.js"]');
      expect(scriptLink).toBeTruthy();
    });

    it('should have favicon links', () => {
      const favicon = document.querySelector('link[rel="icon"]');
      expect(favicon).toBeTruthy();
    });
  });

  describe('Hero Slider Elements', () => {
    it('should have hero slider container', () => {
      const slider = document.getElementById('heroSlider');
      expect(slider).toBeTruthy();
    });

    it('should have hero slides', () => {
      const slides = document.querySelectorAll('.hero-slide');
      expect(slides.length).toBeGreaterThan(0);
    });

    it('should have navigation buttons', () => {
      const prevBtn = document.getElementById('heroPrevBtn');
      const nextBtn = document.getElementById('heroNextBtn');
      expect(prevBtn).toBeTruthy();
      expect(nextBtn).toBeTruthy();
    });

    it('should have indicator buttons', () => {
      const indicators = document.querySelectorAll('.hero-indicator');
      expect(indicators.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile Menu', () => {
    it('should have mobile menu button', () => {
      const btn = document.getElementById('mobileMenuBtn');
      expect(btn).toBeTruthy();
    });

    it('should have mobile menu element', () => {
      const menu = document.getElementById('mobileMenu');
      expect(menu).toBeTruthy();
    });
  });

  describe('Year Element', () => {
    it('should have year element for copyright', () => {
      const yearElement = document.getElementById('year');
      expect(yearElement).toBeTruthy();
    });
  });
});



