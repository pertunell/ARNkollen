
export default async function handler(req, res) {
  const { orgnr } = req.query
  const token = req.headers.authorization
  const r = await fetch('https://gw.api.bolagsverket.se/vardefulla-datamangder/v1/organisationer', {
    method: 'POST',
    headers: { 
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ identitetsbeteckning: orgnr.replace('-', '') })
  })
  const data = await r.json()
  res.json(data)
}