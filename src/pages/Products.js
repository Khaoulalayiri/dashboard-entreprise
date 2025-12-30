import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct, deleteProduct } from '../redux/slices/dataSlice';
import { Package, Edit, Trash2, Search, Plus } from 'lucide-react';
import { formatCurrency, getStatusColor } from '../utils/mockData';

const Products = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const { products } = useSelector((state) => state.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    status: 'in_stock',
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    if (editingProduct) {
      dispatch(updateProduct({ ...productData, id: editingProduct.id }));
    } else {
      dispatch(addProduct(productData));
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      dispatch(deleteProduct(id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Electronics',
      price: '',
      stock: '',
      status: 'in_stock',
    });
    setEditingProduct(null);
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Gestion des Produits
            </h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Gérez votre catalogue de produits
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter Produit
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${darkMode ? 'glass' : 'glass-light'}`}>
          <Search size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none flex-1"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const statusStyle = getStatusColor(product.status);
          return (
            <div
              key={product.id}
              className={`${darkMode ? 'glass' : 'glass-light'} p-6 rounded-2xl hover-lift`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Package size={32} className="text-white" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
                    }`}
                  >
                    <Edit size={18} className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
                    }`}
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>

              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.category}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {formatCurrency(product.price)}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ color: statusStyle.text, background: statusStyle.bg }}
                >
                  {product.status === 'in_stock' ? 'En stock' :
                   product.status === 'low_stock' ? 'Stock faible' : 'Rupture'}
                </span>
              </div>

              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Stock: <span className="font-semibold">{product.stock} unités</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className={`${darkMode ? 'glass' : 'glass-light'} rounded-2xl p-6 w-full max-w-md modal-content-enter`}>
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {editingProduct ? 'Modifier Produit' : 'Nouveau Produit'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nom du Produit
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
                  required
                />
              </div>
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Food">Food</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Prix (€)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
                  required
                />
              </div>
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className={`w-full ${darkMode ? 'input-field' : 'input-field-light'}`}
                  required
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="btn-primary flex-1">
                  {editingProduct ? 'Modifier' : 'Ajouter'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn-secondary flex-1"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;