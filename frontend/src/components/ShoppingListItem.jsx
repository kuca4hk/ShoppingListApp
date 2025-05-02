// components/ShoppingListItem.jsx
import { motion } from 'framer-motion';

const ShoppingListItem = ({ item, onEdit, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="font-medium text-gray-700">{item.name}</span>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={() => onEdit(item)}
                        className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ShoppingListItem;