// components/ShoppingList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchShoppingLists, deleteShoppingList } from '../services/api';
import ShoppingListCard from './ShoppingListCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ShoppingList = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await fetchShoppingLists();
            setLists(data);
        } catch (err) {
            setError(err.message || 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteShoppingList(id);
            setLists(lists.filter(list => list._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete shopping list');
        }
    };

    const handleCreate = () => {
        navigate('/create-list');
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Shopping Lists</h1>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lists.map((list) => (
                    <ShoppingListCard
                        key={list._id}
                        list={list}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {lists.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No shopping lists found</p>
                </div>
            )}
        </div>
    );
};

export default ShoppingList;