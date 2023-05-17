// Student Name: Evan Bezuidenhout
// Student Number: EB22010002711
// Level: 4
// Task: 30
// Compulsory Task: Yes
// File Name: Search.js

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/userDetailsStyle.css'

function Search() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  // Define a function to handle form submission
  const handleSubmit = (event) => { 
    event.preventDefault() // Prevent the default form submission behavior
    navigate(`/users?username=${username}`) // Navigate to the path '/users' with a query parameter 'username'
  }

  // Render a form where user can input a username and submit
  return (
    <div>
      <header className="searchHeader">
        <form className="searchForm" onSubmit={handleSubmit}> {/* Call the handleSubmit function on form submission */}
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)} // Update the username state variable with the input value
            placeholder="Enter a GitHub username"
            required
          />
          <button type="submit">Search</button> {/* Submit the form */}
        </form>
      </header>
    </div>
  )
}

export default Search