// services/api.js
const API_BASE_URL = process.env.VITE_BACKEND_URL;

export const fetchShoppingLists = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/shoppingList`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching shopping lists:', error);
        throw error;
    }
};

export const deleteShoppingList = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/shoppingList/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting shopping list:', error);
        throw error;
    }
};

// services/api.js
export const updateShoppingList = async (id, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/shoppingList/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating shopping list:', error);
        throw error;
    }
};

// services/api.js
export const createShoppingList = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/shoppingList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating shopping list:', error);
        throw error;
    }
};

export const updateItemMarker = async (itemId, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Chyba HTTP! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Chyba při označování položky:', error);
        throw error;
    }
};