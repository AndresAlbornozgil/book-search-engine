// Import necessary modules and components
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Navbar from './components/Navbar';
import AuthService from './utils/auth';

// Setup HTTP link for GraphQL
const graphqlLink = new HttpLink({
  uri: '/graphql',
});

// Set up authorization context for JWT support
const authContextLink = setContext((_, { headers }) => {
  const token = AuthService.loggedIn() ? AuthService.getToken() : '';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client instance
const apolloClient = new ApolloClient({
  link: authContextLink.concat(graphqlLink),
  cache: new InMemoryCache(),
});

// Main application component
const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Outlet />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
