export default async function handler(req, res) {
  const body = [
    'grant_type=client_credentials',
    'client_id=H9OA9STs2SA_0LwcVTzwmYMk9bAa',
    'client_secret=qtuhRsY_bRiXFQXZvgpXltd_8Uga',
    'scope=vardefulla-datamangder:read vardefulla-datamangder:ping'
  ].join('&')

  const r = await fetch('https://portal.api.bolagsverket.se/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  })
  const data = await r.json()
  res.json(data)
}