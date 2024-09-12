import './App.css';  // Import the CSS file for styling
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'; // Import Apollo Client components for GraphQL integration
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import { setContext } from '@apollo/client/link/context'; // Import setContext for setting up request headers
import AuthService from './utils/auth'; // Import custom authentication service
import Navbar from './components/Navbar'; // Import the Navbar component

// Create an HTTP link to connect to the GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/graphql', // Specify the GraphQL server URI
});

// Set up a context link to include JWT token in headers for authenticated requests
const authLink = setContext((request, { headers }) => {
  // Check if the user is logged in and retrieve the token from local storage
  const token = AuthService.loggedIn() ? AuthService.getToken() : null;
  
  // Return the headers, adding the authorization token if it exists
  return {
    headers: {
      ...headers, // Spread existing headers to keep them intact
      authorization: token ? `Bearer ${token}` : '', // Set the Authorization header if token is present
    },
  };
});

// Initialize the Apollo Client with authentication and HTTP link, and set up in-memory caching
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink for handling requests
  cache: new InMemoryCache(), // Use InMemoryCache for caching GraphQL data
});

// Main App component that wraps the application with ApolloProvider
function App() {
  return (
    <ApolloProvider client={client}> {/* Provide Apollo Client to the app for GraphQL queries and mutations */}
      <Navbar /> {/* Render the navigation bar */}
      <Outlet /> {/* Render child routes for nested routing */}
    </ApolloProvider>
  );
}

export default App; // Export the App component as the default export
