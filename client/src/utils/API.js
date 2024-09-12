// Fetch logged-in user's information using the provided token
export const fetchUserProfile = (authToken) => {
    return fetch('/api/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
  };
  
  // Create a new user with the given data
  export const registerNewUser = (newUserData) => {
    return fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    });
  };
  
  // Authenticate a user with login credentials
  export const authenticateUser = (credentials) => {
    return fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  };
  
  // Add a book to the user's saved list
  export const addBookToUser = (bookDetails, authToken) => {
    return fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(bookDetails),
    });
  };
  
  // Delete a book from the user's saved list
  export const removeBookFromUser = (bookId, authToken) => {
    return fetch(`/api/users/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  };
  
  // Search books from Google Books API based on a query
  export const googleBooksSearch = (searchQuery) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
  };
  