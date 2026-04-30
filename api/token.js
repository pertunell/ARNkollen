export default async function handler(req, res) {
  const r = await fetch('https://apitest.bolagsverket.se/auth/realms/prod/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: req.body
  })
  const data = await r.json()
  res.json(data)
}
