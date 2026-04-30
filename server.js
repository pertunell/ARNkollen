import express from 'express'
import fetch from 'node-fetch'

const app = express()
app.use(express.urlencoded({ extended: true }))

app.post('/api/token', async (req, res) => {
  const r = await fetch('https://apitest.bolagsverket.se/auth/realms/prod/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(req.body)
  })
  const data = await r.json()
  res.json(data)
})

app.get('/api/bolag/:orgnr', async (req, res) => {
  const token = req.headers.authorization
  const r = await fetch('https://apitest.bolagsverket.se/vardefulladatamangder/v1/organisationer/' + req.params.orgnr, {
    headers: { Authorization: token }
  })
  const data = await r.json()
  res.json(data)
})

app.listen(3001, () => console.log('Proxy kör på port 3001'))