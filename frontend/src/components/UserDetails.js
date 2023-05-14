import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from './Loader'

const UserDetails = () => {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const { username } = useParams()

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
  }, [username])

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => setRepos(data))
  }, [username])

  if (!user || repos.length === 0) return <Loader />

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <p>{user.location}</p>
      <img src={user.avatar_url} alt={user.name} />
      <h2>User Repositories:</h2>
      <ul>
        {repos.slice(0, 5).map((repo) => (
          <li key={repo.id}>
            <Link to={`/repo/${username}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails
