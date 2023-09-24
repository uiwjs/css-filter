import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './app/App';
import { Fragment } from 'react';

export const GlobalStyle = createGlobalStyle`
  [data-color-mode*='dark'], [data-color-mode*='dark'] body {
    --color-border-default: #21262d;
    --color-label-bg: #333;
  }
  [data-color-mode*='light'], [data-color-mode*='light'] body {
    --color-border-default: #d0d7de;
    --color-label-bg: #ededed;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    background-color: #282c34;
  }
  *, ::before, ::after {
    box-sizing: border-box;
  }
`;

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Fragment>
    <GlobalStyle />
    <App />
  </Fragment>,
);
