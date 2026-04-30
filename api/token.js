export default async function handler(req, res) {
  const body = `grant_type=client_credentials&client_id=lIclSqtjDit_jSjl5c7RtongaFIa&client_secret=3n22pRi80yVBTqnYzqp_6fc0CfYa`
  
  const r = await fetch('https://apitest.bolagsverket.se/auth/realms/prod/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  })
  const data = await r.json()
  res.json(data)
}