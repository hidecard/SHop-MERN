const API_URL = 'http://localhost:5000/api';


// Admin user

export const getAdminUsers = async () => {
    const response = await fetch(`${API_URL}/admin/users`);
    return response.json();
}

// create admin user

export const createAdminUser = async (userData) => {
    const response = await fetch(`${API_URL}/admin/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
}

// edit admin user

export const editAdminUser = async (id, userData) => {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
}

// delete admin user

export const deleteAdminUser = async (id) => {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'DELETE',
    });
    return response.json();
}

// Category management

// show categories
export const getCategories = async () => {
    const response = await fetch(`${API_URL}/admin/categories`);
    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    return response.json();
}

// create category

export const createCategory = async (categoryData) => {
    const response = await fetch(`${API_URL}/admin/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
    });
    return response.json();
}

// edit category

export const editCategory = async (id, categoryData) => {
    const response = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
    });
    return response.json();
}

// delete category

export const deleteCategory = async (id) => {
    const response = await fetch(`${API_URL}/admin/categories/${id}`, {
        method: 'DELETE',
    });
    return response.json();
}

//show product

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/admin/products`);
   if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    return response.json();

};

//create product


export const createProduct = async (productData) => {
    const response = await fetch(`${API_URL}/admin/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });
    return response.json();
}

// edit product

export const editProduct = async (id, productData) => {
  const response = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return response.json();
};



// delete product

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/admin/product/${id}`, {
        method: 'DELETE',
    });
    return response.json();
}