// components/EditListForm.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateShoppingList, updateItemMarker } from '../services/api';

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
            console.error('Chyba při ukládání seznamu:', error);
        }
    };

    const handleToggleMarker = async (itemId) => {
        try {
            // Najdeme položku k aktualizaci
            const itemToUpdate = formData.items.find(item => item._id === itemId);
            if (!itemToUpdate) return;

            // Připravíme novou hodnotu markeru
            const newMarkerValue = !itemToUpdate.marker;

            // Voláme PUT endpoint s novou hodnotou markeru
            await updateItemMarker(itemId, { marker: newMarkerValue });

            // Aktualizujeme stav
            setFormData(prev => ({
                ...prev,
                items: prev.items.map(item =>
                    item._id === itemId ? { ...item, marker: newMarkerValue } : item
                )
            }));
        } catch (error) {
            console.error('Chyba při označování položky:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Upravit nákupní seznam</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 mb-2 font-medium">Název</label>
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
                    <label className="block text-gray-700 mb-2 font-medium">Vytvořil</label>
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
                    <h3 className="block text-gray-700 mb-2 font-medium">Položky</h3>
                    {formData.items.map((item, index) => (
                        <div key={item._id} className="flex items-center space-x-2 mb-3">
                            <button
                                type="button"
                                onClick={() => handleToggleMarker(item._id)}
                                className={`p-2 rounded-full ${item.marker ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                title={item.marker ? 'V košíku' : 'Označit jako v košíku'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </button>

                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].name = e.target.value;
                                    setFormData({ ...formData, items: newItems });
                                }}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input_color"
                                placeholder="Název položky"
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
                        Zrušit
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Uložit změny
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditListForm;