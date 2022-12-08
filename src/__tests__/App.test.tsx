import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  global.window.electron = {
    minimize: jest.fn(),
    maximize: jest.fn(),
    close: jest.fn(),
    setTime: jest.fn(),
    sendMessage: jest.fn(),
    storeSettings: jest.fn(),
    saveSetting: jest.fn(),
    getSettings: jest.fn(),
    ipcRenderer: {
      sendMessage: jest.fn(),
      on: jest.fn(),
      once: jest.fn(),
    },
  };
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
