// MatchMedia mock
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // legacy
    removeListener: jest.fn(), // legacy
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// IntersectionObserver mock
class MockIntersectionObserver implements IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = "";
  thresholds: ReadonlyArray<number> = [];

  constructor(
    public callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    if (options) {
      this.root = options.root instanceof Element ? options.root : null;
      this.rootMargin = options.rootMargin ?? "";
      this.thresholds = Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold ?? 0];
    }
  }

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn().mockReturnValue([]);
}

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// ✅ ResizeObserver mock
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});
