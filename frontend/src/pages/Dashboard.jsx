import React from 'react';
import StackComponent from "../components/StackComponent.jsx";

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <p>This is the main page of your application.</p>
            <p>You can add more content here.</p>
            <p>Here are some items:</p>
            <div className="shopping-list">
                <StackComponent />
            </div>
        </div>
    )
}

export default Dashboard;