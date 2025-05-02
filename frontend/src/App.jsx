// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import EditListForm from './components/EditListForm';
import ListForm from './components/ListForm';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<ShoppingList />} />
                    <Route path="/edit-list/:id" element={<EditListForm />} />
                    <Route path="/create-list" element={<ListForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;