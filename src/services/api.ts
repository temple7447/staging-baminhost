export const BASE_API_URL = 'http://localhost:5000';
// export const BASE_API_URL = 'https://bamihustle-backend-1.onrender.com';

// Simple API utility for non-RTK Query requests
export const api = {
  get: async (url: string, options?: RequestInit) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_API_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw error;
    }

    return { data: await response.json() };
  },
  post: async (url: string, data?: any, options?: RequestInit) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options?.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw error;
    }

    return { data: await response.json() };
  },
  put: async (url: string, data?: any, options?: RequestInit) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_API_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options?.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw error;
    }

    return { data: await response.json() };
  },
  patch: async (url: string, data?: any, options?: RequestInit) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_API_URL}${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw error;
    }

    return { data: await response.json() };
  },
  delete: async (url: string, options?: RequestInit) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_API_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw error;
    }

    return { data: await response.json() };
  },
};
