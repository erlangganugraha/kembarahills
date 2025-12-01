# Testing Guide

## Setup

Install dependencies:
```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with UI:
```bash
npm run test:ui
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run responsive tests only:
```bash
npm run test:responsive
```

## Test Structure

- `script.test.js` - Tests for JavaScript functionality
- `setup.js` - Test configuration and mocks

## What's Tested

### HTML Structure Tests (`html-structure.test.js`)
1. **Basic Structure** - Validates HTML structure
2. **Meta Tags** - SEO, Open Graph, Twitter Cards
3. **Structured Data** - JSON-LD validation
4. **Semantic HTML** - Header, main, footer
5. **Images** - Alt text and loading attributes
6. **Links** - Internal and external links
7. **Accessibility** - ARIA labels and heading hierarchy

### Responsive Design Tests (`responsive.test.js`)
1. **Viewport Meta Tag** - Mobile viewport configuration
2. **Responsive Classes** - Tailwind responsive utilities (sm:, md:, lg:)
3. **Typography Responsiveness** - Text scaling across breakpoints
4. **Mobile Menu** - Responsive menu visibility
5. **Responsive Images** - Image sizing and containers
6. **Responsive Spacing** - Padding and margin at different breakpoints
7. **Responsive Layouts** - Grid and flex layouts
8. **Hero Section** - Responsive hero height and content
9. **Containers** - Responsive container widths and padding
10. **Cards** - Responsive card layouts
11. **Buttons** - Responsive button sizes
12. **Navigation** - Responsive navigation layout
13. **Sections** - Responsive section padding

### JavaScript Tests (`script.test.js`)
1. **Year Update** - Verifies year element is updated
2. **Header Scroll Effect** - Tests header scroll behavior
3. **Mobile Menu** - Tests mobile menu toggle functionality
4. **Smooth Scroll** - Tests anchor link scrolling
5. **Hero Slider** - Tests slider elements and controls
6. **Scroll Animations** - Tests fade-in animations

## Adding New Tests

Create new test files in the `tests/` directory following the pattern:
```javascript
import { describe, it, expect } from 'vitest';

describe('Feature Name', () => {
  it('should do something', () => {
    // Test code
  });
});
```

