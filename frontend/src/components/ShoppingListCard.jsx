// components/ShoppingListCard.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ShoppingListCard = ({ list, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-list/${list._id}`, { state: { list } });
    };

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${list.title}"?`)) {
            await onDelete(list._id);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800 truncate">{list.title}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {list.items.length} items
          </span>
                </div>

                <p className="text-gray-500 text-sm mb-4">Created by: {list.creator}</p>

                <div className="space-y-2 mb-4">
                    {list.items.slice(0, 3).map((item) => (
                        <div key={item._id} className="flex justify-between items-center">
                            <span className="text-gray-700">{item.name}</span>
                            <span className="text-gray-500 text-sm">x{item.quantity}</span>
                        </div>
                    ))}
                    {list.items.length > 3 && (
                        <p className="text-gray-400 text-sm">+{list.items.length - 3} more items...</p>
                    )}
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                        <span>Created: {new Date(list.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={handleEdit}
                            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ShoppingListCard;