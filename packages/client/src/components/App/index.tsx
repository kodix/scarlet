import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider, useQuery, useSubscription } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import styled, { ThemeProvider, css } from 'styled-components';
import theme from '../../styles/theme';
import StoreProvider, { useRoutes } from '../StoreContext';

const GRAPHQL_ENDPOINT = '://localhost:4000/graphql';

const httpLink = new HttpLink({
  uri: `http${GRAPHQL_ENDPOINT}`,
});

const client = new SubscriptionClient(`ws${GRAPHQL_ENDPOINT}`, {
  reconnect: true,
  connectionParams: {
    authToken: '21312',
  },
});

const wsLink = new WebSocketLink(client);

const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([terminatingLink]),
});

const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
    }
  }
`;

const MESSAGE_CREATED = gql`
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

const GqlTest: React.FC = () => {
  const { subscribeToMore, loading, data } = useQuery(GET_MESSAGES);

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newFeedItem = subscriptionData.data.messageCreated;
        return Object.assign({}, prev, {
          messages: [...prev.messages, newFeedItem],
        });
      },
    });
  }, []);

  if (loading) {
    return <div>isLoading</div>;
  }
  console.log(data);
  return (
    <div>
      {data.messages.map((item: any) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <RouteLinksList />

            <StyledDiv>
              <RouteViewList />
            </StyledDiv>
            <GqlTest />
          </Router>
        </ThemeProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
