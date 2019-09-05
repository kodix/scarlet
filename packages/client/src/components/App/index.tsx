import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider, useQuery } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import styled, { ThemeProvider, css } from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import theme from '../../styles/theme';
import StoreProvider, { useRoutes } from '../StoreContext';

const GRAPHQL_ENDPOINT = 'ws://172.20.0.3:1080';

const client = new SubscriptionClient(`${GRAPHQL_ENDPOINT}`, {
  reconnect: true,
});

const wsLink = new WebSocketLink(client);

const terminatingLink = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    (definition.operation === 'query' || definition.operation === 'subscription')
  );
}, wsLink);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([terminatingLink]),
});

const GET_HELLO = gql`
  query {
    message
  }
`;

const HELLO_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      id
      content
    }
  }
`;

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
      render={(props) => (
        <RouteComponent {...props} {...rest}>
          <GqlTest />
        </RouteComponent>
      )}
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

const GqlTest: React.FC = () => {
  const { loading, data } = useQuery(GET_HELLO);

  // useEffect(() => {
  //   return subscribeToMore({
  //     document: MESSAGE_CREATED,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;

  //       const newFeedItem = subscriptionData.data.messageCreated;
  //       return Object.assign({}, prev, {
  //         messages: [...prev.messages, newFeedItem],
  //       });
  //     },
  //   });
  // }, []);
  if (loading) {
    return <div>isLoading</div>;
  }

  if (!data) {
    return <div>Error ocurred</div>;
  }

  return (
    <div>
      {data.messages.map((item: any) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
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

const GQL: React.FC = () => {
  const { loading, data } = useQuery(GET_HELLO);

  console.log(loading, data);

  if (loading) {
    return null;
  }

  return <div>{JSON.stringify(data)}</div>;
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <StoreProvider>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <>
              <GQL />
            </>
          </ThemeProvider>
        </StylesProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
