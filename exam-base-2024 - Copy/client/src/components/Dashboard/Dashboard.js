import './Dashboard.css'; // Import the CSS file for styling
import React, { useContext } from 'react';
import AppContext from '../../state/AppContext'; // Import the global state
import { Link } from 'react-router-dom'; // Import Link for navigation

const Dashboard = () => {
  const globalState = useContext(AppContext); // Access the global state

  return (
    <div className='dashboard'>
      {/* Welcome message with the user's email and role */}
      <h1>Welcome, {globalState.user.data.email}!</h1>
      <h2>You are logged in as a {globalState.user.data.type} user.</h2>

      {/* Display different content based on the user's role */}
      {globalState.user.data.type === 'admin' && (
        <div className='admin-section'>
          <h3>Admin Actions</h3>
          <ul>
            <li>
              <Link to='/admin/users'>Manage Users</Link> {/* Link to manage users */}
            </li>
            <li>
              <Link to='/admin/projects'>View All Projects</Link> {/* Link to view all projects */}
            </li>
          </ul>
        </div>
      )}

      {globalState.user.data.type === 'regular' && (
        <div className='regular-section'>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to='/projects'>View Your Projects</Link> {/* Link to view user's projects */}
            </li>
            <li>
              <Link to='/projects/new'>Create a New Project</Link> {/* Link to create a new project */}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;