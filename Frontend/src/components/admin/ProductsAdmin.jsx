import { useState, useEffect } from 'react';
import { getProducts, createProduct, editProduct, deleteProduct, getCategories } from '../../lib/api';

function ProductsAdmin() {
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '', categoryId: '', imageURLs: '' });
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setProducts([]);
        setCategories([]);
      }
    };
    fetchData();
  }, []);

  // Create or Edit Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        imageURLs: form.imageURLs ? [form.imageURLs] : [],
      };

      if (editingId) {
        await editProduct(editingId, productData);
        const updatedList = await getProducts();
        setProducts(updatedList);
        alert('Product updated successfully');
      } else {
        const newProduct = await createProduct(productData);
        setProducts([...products, newProduct]);
        alert('Product created successfully');
      }

      setForm({ name: '', description: '', price: '', stock: '', categoryId: '', imageURLs: '' });
      setEditingId(null);
    } catch (error) {
      alert(error.message || ' Failed to save product');
    }
  };

  // Load selected product data into form
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId?._id || '',
      imageURLs: product.imageURLs?.[0] || '',
    });
    setEditingId(product._id);
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      alert('Product deleted');
    } catch (error) {
      alert(error.message || 'Failed to delete product');
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold text-orange-600">Manage Products</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-orange-600">
          {editingId ? 'Edit Product' : 'Add Product'}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="url"
              value={form.imageURLs}
              onChange={(e) => setForm({ ...form, imageURLs: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          {editingId ? 'Update Product' : 'Create Product'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: '', description: '', price: '', stock: '', categoryId: '', imageURLs: '' });
              setEditingId(null);
            }}
            className="px-4 py-2 mt-4 ml-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Product List */}
      <h2 className="mb-4 text-2xl font-semibold text-orange-600">Products List</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">Price: ${Number(product.price).toFixed(2)}</p>
                <p className="text-gray-600">Stock: {product.stock}</p>
                <p className="text-gray-600">Category: {product.categoryId?.name || 'Uncategorized'}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsAdmin;
