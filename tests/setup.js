// Test setup file
import { beforeEach, afterEach } from 'vitest';
import { cleanup } from '@testing-library/jest-dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};

// Mock window.scrollTo
global.window.scrollTo = () => {};

