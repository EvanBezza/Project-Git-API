import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/user/${username}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter a GitHub username"
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;
