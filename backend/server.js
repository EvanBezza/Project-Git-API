// Student Name: Evan Bezuidenhout
// Student Number: EB22010002711
// Level: 4
// Task: 30
// Compulsory Task: Yes
// File Name: server.js

const express = require('express')
require('dotenv').config() // Load environment variables
const helmet = require('helmet') // Import Helmet to secure Express app

// Create an Express app
const app = express()
// Use Helmet to secure the app
app.use(helmet())

// Import the https module for making requests
const https = require('https')

// Define a GET route for searching users on GitHub
app.get('/api/search/:username', (req, res) => {
  https
    .get(
      `https://api.github.com/search/users?q=${req.params.username}`, // GitHub search API endpoint
      {
        headers: {
          // Necessary headers for the API request
          'User-Agent': 'Node.js server',
          Authorization: `token ${process.env.GITHUB_TOKEN}`, // Use GitHub token from environment variables
        },
      },
      (response) => {
        let data = ''

        // Accumulate data as it comes in
        response.on('data', (chunk) => {
          data += chunk
        })

        // When all data has been received, send it as a response
        response.on('end', () => {
          res.json(JSON.parse(data))
        })
      },
    )
    // Handle possible errors
    .on('error', (err) => {
      res.status(500).json({ message: err.message })
    })
})

// Define a GET route for fetching user details from GitHub
app.get('/api/users/:username', (req, res) => {
  https
    .get(
      `https://api.github.com/users/${req.params.username}`, // GitHub user API endpoint
      {
        headers: {
          // Necessary headers for the API request
          'User-Agent': 'Node.js server',
          Authorization: `token ${process.env.GITHUB_TOKEN}`, // Use GitHub token from environment variables
        },
      },
      (response) => {
        let data = ''

        // Accumulate data as it comes in
        response.on('data', (chunk) => {
          data += chunk
        })

        // When all data has been received, send it as a response
        response.on('end', () => {
          res.json(JSON.parse(data))
        })
      },
    )
    // Handle possible errors
    .on('error', (err) => {
      res.status(500).json({ message: err.message })
    })
})

// Define a GET route for fetching user repositories from GitHub
app.get('/api/users/:username/repos', (req, res) => {
  https
    .get(
      `https://api.github.com/users/${req.params.username}/repos`, // GitHub user repos API endpoint
      {
        headers: {
          // Necessary headers for the API request
          'User-Agent': 'Node.js server',
          Authorization: `token ${process.env.GITHUB_TOKEN}`, // Use GitHub token from environment variables
        },
      },
      (response) => {
        let data = ''

        // Accumulate data as it comes in
        response.on('data', (chunk) => {
          data += chunk
        })

        // When all data has been received, send it as a response
        response.on('end', () => {
          res.json(JSON.parse(data))
        })
      },
    )
    // Handle possible errors
    .on('error', (err) => {
      res.status(500).json({ message: err.message })
    })
})

// Define a GET route for fetching repository details from GitHub
app.get('/api/repos/:owner/:repo', (req, res) => {
  const repoData = {} // Object to store the repository data

  https
    .get(
      `https://api.github.com/repos/${req.params.owner}/${req.params.repo}`, // GitHub repo API endpoint
      {
        headers: {
          // Necessary headers for the API request
          'User-Agent': 'Node.js server',
          Authorization: `token ${process.env.GITHUB_TOKEN}`, // Use GitHub token from environment variables
        },
      },
      (response) => {
        let data = ''

        // Accumulate data as it comes in
        response.on('data', (chunk) => {
          data += chunk
        })

        // When all data has been received, store it in the repoData object
        response.on('end', () => {
          repoData.repo = JSON.parse(data)

          https
            .get(
              `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/commits?per_page=5`, // GitHub repo commits API endpoint
              {
                headers: {
                  // Necessary headers for the API request
                  'User-Agent': 'Node.js server',
                  Authorization: `token ${process.env.GITHUB_TOKEN}`, // Use GitHub token from environment variables
                },
              },
              (response) => {
                let data = ''

                // Accumulate data as it comes in
                response.on('data', (chunk) => {
                  data += chunk
                })

                // When all data has been received, store it in the repoData object and send it as a response
                response.on('end', () => {
                  repoData.commits = JSON.parse(data)
                  res.json(repoData)
                })
              },
            )
            // Handle possible errors
            .on('error', (err) => {
              res.status(500).json({ message: err.message })
            })
        })
      },
    )
    // Handle possible errors
    .on('error', (err) => {
      res.status(500).json({ message: err.message })
    })
})

// Set the app to listen on port 8000
app.listen(8000, () => {
  console.log('Server running on port 8000')
})

// References:
// https://dev.to/dallington256/how-to-use-env-file-in-nodejs-578h
// https://www.youtube.com/watch?v=Xhg-0mqxngA