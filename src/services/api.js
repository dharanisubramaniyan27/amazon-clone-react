const API_BASE_URL = 'http://localhost:5000/api';

// Auth APIs
export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Cart APIs
export const addToCart = async (userId, productId, qty = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, qty }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add to cart');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch cart');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to remove from cart');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Product APIs
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch products');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Review APIs
export const getReviews = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${productId}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addReview = async (productId, userId, rating, comment) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, userId, rating, comment }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Checkout API
export const checkout = async (userId, total) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, total }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
