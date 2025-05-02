// components/EditListForm.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateShoppingList } from '../services/api';
import '../styles/EditListForm.css';

const EditListForm = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        creator: '',
        items: []
    });

    useEffect(() => {
        if (state?.list) {
            setFormData({
                title: state.list.title,
                creator: state.list.creator,
                items: state.list.items
            });
        }
    }, [state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateShoppingList(id, formData);
            navigate('/');
        } catch (error) {
            console.error('Error updating list:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Shopping List</h2>

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
                    <h3 className="block text-gray-700 mb-2 font-medium">Items</h3>
                    {formData.items.map((item, index) => (
                        <div key={item._id} className="flex items-center space-x-3 mb-3">
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].name = e.target.value;
                                    setFormData({ ...formData, items: newItems });
                                }}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input_color"
                                placeholder="Item name"
                            />
                            <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].quantity = parseInt(e.target.value) || 1;
                                    setFormData({ ...formData, items: newItems });
                                }}
                                className="w-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input_color"
                            />
                        </div>
                    ))}
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
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditListForm;