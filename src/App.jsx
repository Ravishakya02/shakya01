import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city , setCity] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch tutorials from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/tutorials')
      .then(response => setTutorials(response.data))
      .catch(error => console.error('There was an error fetching the tutorials!', error));
  }, []);

  // Handle form submission for creating or updating a tutorial
  const handleSubmit = (e) => {
    e.preventDefault();

    const tutorial = { title, description, city };

    if (editingId) {
      // Update tutorial
      axios.put(`http://localhost:8080/api/tutorials/${editingId}`, tutorial)
        .then(response => {
          setTutorials(tutorials.map(t => t.id === editingId ? response.data : t));
          resetForm();
        })
        .catch(error => console.error('Error updating tutorial!', error));
    } else {
      // Create new tutorial
      axios.post('http://localhost:8080/api/tutorials', tutorial)
        .then(response => {
          setTutorials([...tutorials, response.data]);
          resetForm();
        })
        .catch(error => console.error('Error creating tutorial!', error));
    }
  };

  // Handle delete tutorial
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/tutorials/${id}`)
      .then(() => {
        setTutorials(tutorials.filter(t => t.id !== id));
      })
      .catch(error => console.error('Error deleting tutorial!', error));
  };

  // Set form fields to edit an existing tutorial
  const handleEdit = (id) => {
    const tutorial = tutorials.find(t => t.id === id);
    setTitle(tutorial.title);
    setDescription(tutorial.description);
    setCity(tutorial.city);
    setEditingId(id);
  };

  // Reset the form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCity('');
    setEditingId(null);
  };

  return (
    <div>
      <h1>Tutorial CRUD App</h1>

      {/* Form for creating or updating a tutorial */}
      <form onSubmit={handleSubmit}>
      <table border="0" cellPadding="10">
          <tbody>
            <tr>
              <td><label htmlFor="title">Title:</label></td>
              <td>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="description">Description:</label></td>
              <td>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="city">City:</label></td>
              <td>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <button type="submit">
                  {editingId ? 'Update Tutorial' : 'Create Tutorial'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {/* List of tutorials */}
      <h2>Tutorials</h2>
      <table border="1"  style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tutorials.map((tutorial) => (
            <tr key={tutorial.id}>
              <td>{tutorial.title}</td>
              <td>{tutorial.description}</td>
              <td>{tutorial.city}</td>
              <td>
                <button onClick={() => handleEdit(tutorial.id)} style={{ marginRight: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(tutorial.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {tutorials.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No tutorials found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tutorials;
