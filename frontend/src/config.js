export const BASE_URL = 'http://localhost:8000/api/v1'
let token = localStorage.getItem('token');

// Check if token exists and is a string
if (typeof token === 'string') {
  // Remove leading and trailing double quotes
  token = token.replace(/^"|"$/g, '');

  // Remove backslashes
  token = token.replace(/\\/g, '');
}

export { token };


