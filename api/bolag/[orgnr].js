export default async function handler(req, res) {
  const { orgnr } = req.query
  const token = req.headers.authorization
  const r = await fetch('https://apitest.bolagsverket.se/vardefulladatamangder/v1/organisationer/' + orgnr, {
    headers: { Authorization: token }
  })
  const data = await r.json()
  res.json(data)
}