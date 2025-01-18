import { db as prisma } from '@/app/lib/db'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
export const dynamic = 'force-dynamic'

const app = new Hono().basePath('/api')

app.get('/hello', c => {
  return c.json({ msg: 'hi :)' })
})

app.post('/segredos', async ctx => {
  const { nome } = await ctx.req.json()
  return ctx.json({ usuario: nome })
})

app.get('/segredos', async ctx => {
  const dados = await prisma.segredos.findMany({ take: 88 })
  return ctx.json({ data: dados })
})

// export default handle(app)
export const GET = handle(app)
export const POST = handle(app)
