import "@testing-library/jest-dom";

// Mock do window.scrollTo para silenciar erros do Framer Motion
Object.defineProperty(window, "scrollTo", { value: jest.fn(), writable: true });
