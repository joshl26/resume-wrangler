/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';

// common mocks (example)
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined)
  })
}));