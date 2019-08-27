import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import styled, { ThemeProvider, css } from 'styled-components';
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
  return <Route path={path} exact render={(props) => <RouteComponent {...props} {...rest} />} />;
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

const App: React.FC = () => {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <RouteLinksList />

          <StyledDiv>
            <RouteViewList />
          </StyledDiv>
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
