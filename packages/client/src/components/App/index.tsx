import React from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import theme from '../../styles/theme';

const StyledDiv = styled.div(({ theme: { primaryColor } }) => {
  return css`
    font-weight: bold;
    font-size: 24px;
    color: ${primaryColor};
  `;
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <StyledDiv>-- Scarlet --</StyledDiv>
  </ThemeProvider>
);

export default App;
