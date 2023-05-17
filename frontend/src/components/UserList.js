// Student Name: Evan Bezuidenhout
// Student Number: EB22010002711
// Level: 4
// Task: 30
// Compulsory Task: Yes
// File Name: UserList.js
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Search from './Search.js'
import '../style/userListStyle.css'

const UserList = () => {
  // Define state variables
  const [users, setUsers] = useState(null)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const username = searchParams.get('username')

  useEffect(() => {
    // Fetch users from local server when component mounts or username changes
    fetch(`/api/search/${username}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => setUsers(data.items))
  }, [username])

  // Show loader if users are not loaded yet
  if (!users) return <Loader />

  return (
    <div>
      {/* Search component for user to input search query */}
      <Search />
      <section id="userListSection">
        <div className="container">
          {/* Map through users and create Link components for each */}
          {users.map((user) => (
            <div key={user.id}>
              <Link className='links' to={`/user/${user.login}?search=${username}`}>
                {user.login}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default UserList
