import { vi } from 'vitest';

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn()
  })),
});
