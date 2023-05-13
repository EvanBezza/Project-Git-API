const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(cors())
app.use(helmet())

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

const https = require('https')

// Search for users
app.get('/api/search/:username', (req, res) => {
  https
    .get(
      `https://api.github.com/search/users?q=${req.params.username}`,
      {
        headers: { 'User-Agent': 'Node.js server' },
      },
      (response) => {
        let data = ''

        response.on('data', (chunk) => {
          data += chunk
        })

        response.on('end', () => {
          res.json(JSON.parse(data))
        })
      },
    )
    .on('error', (err) => {
      res.status(500).json({ message: err.message })
    })
})

// Fetch user details
app.get('/api/users/:username', (req, res) => {
  https
    .get(
      `https://api.github.com/users/${req.params.username}`,
      {
        headers: { 'User-Agent': 'Node.js server' },
      },
      (response) => {
        let data = ''

        response.on('data', (chunk) => {
          data += chunk
        })

        response.on('end', () => {
          res.json(JSON.parse(data))
        })
      },
    )
    .on('error', (err) => {
      res.status(500).json({ message: err.message })
    })
})

// Fetch repo details
app.get('/api/repos/:owner/:repo', (req, res) => {
  const repoData = {}
  https
    .get(
      `https://api.github.com/repos/${req.params.owner}/${req.params.repo}`,
      {
        headers: { 'User-Agent': 'Node.js server' },
      },
      (response) => {
        let data = ''

        response.on('data', (chunk) => {
          data += chunk
        })

        response.on('end', () => {
          repoData.repo = JSON.parse(data)

          https
            .get(
              `https://api.github.com/repos/${req.params.owner}/${req.params.repo}/commits?per_page=5`,
              {
                headers: { 'User-Agent': 'Node.js server' },
              },
              (response) => {
                let data = ''

                response.on('data', (chunk) => {
                  data += chunk
                })

                response.on('end', () => {
                  repoData.commits = JSON.parse(data)
                  res.json(repoData)
                })
              },
            )
            .on('error', (err) => {
              res.status(500).json({ message: err.message })
            })
        })
      },
    )
    .on('error', (err) => {
      res.status(500).json({ message: err.message })
    })
})
