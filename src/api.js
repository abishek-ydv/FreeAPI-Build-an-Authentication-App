const BASE_URL = 'https://api.freeapi.app/api/v1/users';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Registration failed');
  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Login failed');
  if (data.data?.accessToken) {
    localStorage.setItem('accessToken', data.data.accessToken);
  }
  return data.data.user;
};

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  const data = await response.json();
  localStorage.removeItem('accessToken');
  if (!response.ok && response.status !== 401) throw new Error(data.message || 'Logout failed');
  return true;
};

export const getCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}/current-user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Failed to fetch user');
  return data.data;
};
