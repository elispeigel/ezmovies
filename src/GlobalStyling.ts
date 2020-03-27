import { createGlobalStyle } from 'styled-components';
import { WHITE } from './constants';

const GlobalStyling = createGlobalStyle`
@font-face {
  font-family: 'Eskell';
  src: url('fonts/Eksell-Medium.2ee52a5b2dd3d29136d4ff4bbe4e74bf.woff2')
}

@font-face {
  font-family: 'Fakt';
  src: url('fonts/FaktPro-Normal.14e19ecce728c94a940ba00346860eff.woff')
}



body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: ${WHITE}
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;

export default GlobalStyling;
