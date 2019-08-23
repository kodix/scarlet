import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html,
  body {
    font-family: SKODA Next, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
    min-width: 320px;
    &.scroll-lock {
      overflow: hidden;
    }
  }
  * {
    box-sizing: border-box;
  }
  input::-webkit-input-placeholder {
    color:  ${(props: any) => props.theme.grey_30};
  }
  input::-moz-placeholder {
    color:  ${(props) => props.theme.grey_30};
  }
  input:-ms-input-placeholder {
    color: ${(props) => props.theme.grey_30};
  }
  b {
    font-weight: bold;
  }
`;
