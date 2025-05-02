// components/ItemForm.jsx
import { useState } from 'react';

const ItemForm = ({ onCancel, onSubmit }) => {
    const [name, setName] = useState('');
    const [count, setCount] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, count });
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Items</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Count</label>
                    <input
                        type="number"
                        min="1"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                        Circle
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ItemForm;