export const BASE_URL = 'http://localhost:8000/api/v1';

let token = localStorage.getItem('token');
let sanitizedToken = token;

// Check if token exists and is a string
if (typeof sanitizedToken === "string") {
  // Remove leading and trailing double quotes
  sanitizedToken = sanitizedToken.replace(/^"|"$/g, "");

  // Remove backslashes
  sanitizedToken = sanitizedToken.replace(/\\/g, "");
}

const modifiedToken = sanitizedToken.replace(/[\/"]/g, "");

token = modifiedToken

export { token };


