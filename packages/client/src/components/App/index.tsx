import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import styled, { ThemeProvider, css } from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import theme from '../../styles/theme';
import StoreProvider, { useRoutes } from '../StoreContext';

const StyledDiv = styled.div(({ theme: { primaryColor } }) => {
  return css`
    font-weight: bold;
    font-size: 24px;
    color: ${primaryColor};
  `;
});

const RouteLink: React.FC<{ path: string; name: string }> = ({ path, name }) => {
  return <Link to={path}>{name}</Link>;
};

const RouteLinksList: React.FC = () => {
  return useObserver(() => (
    <>
      {useRoutes().allRoutes.map(({ path, name }) => (
        <RouteLink key={path} path={path} name={name} />
      ))}
    </>
  ));
};

const RouteView: React.FC<{
  path: string;
  name: string;
  RouteComponent: React.FC<{ name: string }>;
}> = ({ path, RouteComponent, ...rest }) => {
  return (
    <Route
      path={path}
      exact
      render={(props) => <RouteComponent {...props} {...rest}></RouteComponent>}
    />
  );
};

const RouteViewList: React.FC = () => {
  return useObserver(() => (
    <>
      {useRoutes().allRoutes.map(({ path, ...rest }) => (
        <RouteView key={path} path={path} {...rest} />
      ))}
    </>
  ));
};

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

const App: React.FC = () => {
  return (
    <StoreProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <>
            <StyledButton>test</StyledButton>
            <Router>
              <RouteLinksList />

              <StyledDiv>
                <RouteViewList />
              </StyledDiv>
            </Router>
          </>
        </ThemeProvider>
      </StylesProvider>
    </StoreProvider>
  );
};

export default App;
