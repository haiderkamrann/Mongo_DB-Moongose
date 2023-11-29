// App.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      if (updateId) {
        await axios.put(`http://localhost:3001/users/${updateId}`, { name });
        setUpdateId(null);
      } else {
        const response = await axios.post('http://localhost:3001/users', { name });
        const newUser = response.data;
        setUsers([...users, newUser]);
      }
      setName('');
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
  };

  const handleUpdateUser = (userId) => {
    const userToUpdate = users.find((user) => user._id === userId);
    setName(userToUpdate.name);
    setUpdateId(userId);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h2>User CRUD</h2>
      <form onSubmit={handleAddUser}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{updateId ? 'Update User' : 'Add User'}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <button onClick={() => handleUpdateUser(user._id)}>Update</button>
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default App;