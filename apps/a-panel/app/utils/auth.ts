// utils/auth.ts

// Function to save the token in localStorage
export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem('authToken', token);
};

// Function to get the token from localStorage
export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('authToken');
};

// Function to remove the token from localStorage
export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('authToken');
};
