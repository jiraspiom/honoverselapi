import { Hono } from 'hono'
import { handle } from 'hono/vercel'
export const dynamic = 'force-dynamic'

const app = new Hono().basePath('/api')

app.get('/hello', c => {
  return c.json({ msg: 'ok' })
})

app.get('/:id', c => {
  const id = c.req.param('id')
  return c.json({ msg: `id e ${id}` })
})

export const GET = handle(app)
