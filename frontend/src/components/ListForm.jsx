// components/ListForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createShoppingList } from '../services/api';
import '../styles/ListForm.css';

const ListForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        items: [{ name: '', quantity: 1 }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...formData.items];
        newItems[index] = {
            ...newItems[index],
            [name]: name === 'quantity' ? parseInt(value) || 1 : value
        };
        setFormData({ ...formData, items: newItems });
    };

    const addNewItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, { name: '', quantity: 1 }]
        });
    };

    const removeItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createShoppingList(formData);
            navigate('/');
        } catch (error) {
            console.error('Error creating list:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create New List</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input_color"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2 font-medium">Creator</label>
                    <input
                        type="text"
                        name="creator"
                        value={formData.creator}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input_color"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2 font-medium">Items</label>
                    {formData.items.map((item, index) => (
                        <div key={index} className="flex items-end space-x-2 mb-2">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="name"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input_color"
                                    placeholder="Item name"
                                    required
                                />
                            </div>
                            <div className="w-20">
                                <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, e)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input_color"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="p-3 text-red-500 hover:text-red-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addNewItem}
                        className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                  clipRule="evenodd"/>
                        </svg>
                        Add Item
                    </button>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Create List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ListForm;