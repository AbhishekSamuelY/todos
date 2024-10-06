import './App.css';
import { useState } from 'react';
import axios from 'axios'

function App() {

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();  
    
    const apiUrl = 'http://localhost:5000/register';
    
    try {
        // Use await to handle the promise returned by axios.post
        const response = await axios.post(apiUrl, { name, email });
        
        if (response.status === 200) {
            console.log(`${name} added successfully`);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);  // Use error.message for better error readability
    }
};

  return (
    <div className="App">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
